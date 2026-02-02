import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { exec } from 'child_process';

const BASE_DIR = path.join(os.homedir(), 'Downloads');
const SESSION_FILE = path.join(os.tmpdir(), 'system_bot_session.json');

// --- SESSION MANAGEMENT (File-based to survive hot-reloads) ---
const getSession = () => {
    try {
        if (fs.existsSync(SESSION_FILE)) {
            return JSON.parse(fs.readFileSync(SESSION_FILE, 'utf8'));
        }
    } catch (e) {
        console.error("Session Read Error", e);
    }
    return { file: null, action: null };
};

const updateSession = (newSession) => {
    try {
        fs.writeFileSync(SESSION_FILE, JSON.stringify(newSession), 'utf8');
    } catch (e) {
        console.error("Session Write Error", e);
    }
    return newSession;
};

// --- AUTOMATION HELPERS ---

const sendViaOutlook = (to, subject, body, attachmentPath) => {
    return new Promise((resolve, reject) => {
        // PowerShell script to invoke Outlook COM object
        // NOTE: This requires Outlook desktop app to be installed and logged in.
        const psScript = `
        try {
            $outlook = New-Object -ComObject Outlook.Application
            $mail = $outlook.CreateItem(0)
            $mail.To = "${to}"
            $mail.Subject = "${subject}"
            $mail.Body = "${body}"
            $mail.Attachments.Add("${attachmentPath}")
            $mail.Send()
            Write-Output "SUCCESS"
        } catch {
            Write-Error $_.Exception.Message
            exit 1
        }
        `;

        // Escape specific chars for command line if needed, simplistic approach for now
        const command = `powershell -NoProfile -ExecutionPolicy Bypass -Command "& { ${psScript.replace(/"/g, '\\"').replace(/\n/g, '; ')} }"`;

        // Actually, passing complex script in command line is tricky with quotes.
        // It's safer to use a temporary ps1 file.
        const tempPsFile = path.join(os.tmpdir(), `send_mail_${Date.now()}.ps1`);
        fs.writeFileSync(tempPsFile, psScript);

        exec(`powershell -NoProfile -ExecutionPolicy Bypass -File "${tempPsFile}"`, (error, stdout, stderr) => {
            // Cleanup
            try { fs.unlinkSync(tempPsFile); } catch (e) { }

            if (error) {
                console.error("Outlook Error:", stderr);
                reject(stderr || error.message);
            } else {
                if (stdout.trim().includes("SUCCESS")) resolve(true);
                else reject("Unknown Outlook failure");
            }
        });
    });
};


let open;
import('open').then(module => { open = module.default; });

// --- PATH RESOLUTION ---
const cleanPath = (p) => {
    if (!p) return null;
    let cleaned = p.trim();
    if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
        cleaned = cleaned.slice(1, -1);
    }
    return cleaned;
};

const resolveFile = (inputPath) => {
    if (!inputPath) return null;
    let fullPath = cleanPath(inputPath);
    if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isFile()) return fullPath;
    const downloadPath = path.join(BASE_DIR, fullPath);
    if (fs.existsSync(downloadPath) && fs.lstatSync(downloadPath).isFile()) return downloadPath;
    try {
        const files = fs.readdirSync(BASE_DIR);
        const match = files.find(f => f.toLowerCase() === fullPath.toLowerCase());
        if (match) return path.join(BASE_DIR, match);
    } catch (e) { }
    return null;
};


// --- API HANDLER ---
export async function POST(request) {
    try {
        const { command } = await request.json();
        console.log(`[API] Command: "${command}"`);
        const lowerCmd = command.toLowerCase();

        let session = getSession();
        let responseText = "";

        // 1. PARSE
        const emailMatch = command.match(/[\w.-]+@[\w.-]+\.\w+/);
        const email = emailMatch ? emailMatch[0] : null;

        let detectedFile = null;
        const absMatch = command.match(/(?:["'])([a-zA-Z]:\\[^"']+)(?:["'])|([a-zA-Z]:\\[\w\-. \\]+)/);
        if (absMatch) detectedFile = resolveFile(absMatch[1] || absMatch[2]);
        if (!detectedFile) {
            const extMatch = command.match(/\b[\w\-. ]+\.[a-zA-Z0-9]{2,4}\b/);
            if (extMatch) detectedFile = resolveFile(extMatch[0]);
        }

        if (detectedFile) session.file = detectedFile;

        let intent = session.action;
        if (lowerCmd.includes('share') || lowerCmd.includes('send') || lowerCmd.includes('mail')) intent = 'share';
        if (lowerCmd.includes('delete') || lowerCmd.includes('remove')) intent = 'delete';
        if (lowerCmd.includes('open') || lowerCmd.includes('launch')) intent = 'open';

        // Save state
        session.action = intent;
        updateSession(session);

        // 2. ACT
        if (!session.action) {
            responseText = "Ready. (Try: 'Open file.txt', 'Delete file.txt', or 'Share file.txt to email@...')";
        }

        else if (session.action === 'delete') {
            if (session.file) {
                try {
                    fs.unlinkSync(session.file);
                    responseText = `SUCCESS: Deleted "${path.basename(session.file)}".`;
                    updateSession({ file: null, action: null });
                } catch (e) {
                    responseText = `Error deleting: ${e.message}`;
                }
            } else {
                responseText = "Which file do you want to delete?";
            }
        }

        else if (session.action === 'open') {
            if (session.file) {
                if (open) await open(session.file);
                else exec(`start "" "${session.file}"`);
                responseText = `Opening "${path.basename(session.file)}"...`;
                updateSession({ file: null, action: null });
            } else {
                responseText = "Which file to open?";
            }
        }

        else if (session.action === 'share') {
            if (session.file && email) {
                responseText = `Sending "${path.basename(session.file)}" to ${email}...`;

                // Try Outlook Automation First
                try {
                    await sendViaOutlook(email, `Sharing ${path.basename(session.file)}`, "Please find attached.", session.file);
                    responseText = `SUCCESS: Sent "${path.basename(session.file)}" to ${email} via Outlook.`;
                    updateSession({ file: null, action: null });
                } catch (outlookError) {
                    console.warn("Outlook failed, falling back to mailto:", outlookError);

                    // Fallback to Mailto
                    const subject = `Sharing ${path.basename(session.file)}`;
                    const body = `Please find attached: ${session.file}`;
                    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                    if (open) await open(mailtoLink);
                    else exec(`start "" "${mailtoLink}"`);

                    responseText = `(Outlook Unreachable). Opened your mail client. Please attach the file manually and send.`;
                    updateSession({ file: null, action: null });
                }
            }
            else if (session.file) {
                responseText = `I have "${path.basename(session.file)}". Who is the email for?`;
            }
            else if (email) {
                responseText = `Sending to ${email}. Which file?`;
            } else {
                responseText = "Share which file to whom?";
            }
        }

        return NextResponse.json({ response: responseText });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ response: `System Error: ${error.message}` }, { status: 500 });
    }
}
