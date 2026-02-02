const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');

let open;
import('open').then(module => {
    open = module.default;
});

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- GLOBAL SESSION ---
let session = {
    file: null,
    action: null
};

const BASE_DIR = path.join(os.homedir(), 'Downloads');

// --- HELPERS ---

const cleanPath = (p) => {
    if (!p) return null;
    let cleaned = p.trim();
    // Remove wrapping quotes
    if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
        cleaned = cleaned.slice(1, -1);
    }
    return cleaned;
};

const resolveFile = (inputPath) => {
    if (!inputPath) return null;
    let fullPath = cleanPath(inputPath);

    // 1. Try Absolute Path
    if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isFile()) {
        return fullPath;
    }

    // 2. Try in Downloads
    const downloadPath = path.join(BASE_DIR, fullPath);
    if (fs.existsSync(downloadPath) && fs.lstatSync(downloadPath).isFile()) {
        return downloadPath;
    }

    // 3. Try fuzzy in Downloads (case insensitive search)
    try {
        const files = fs.readdirSync(BASE_DIR);
        const match = files.find(f => f.toLowerCase() === fullPath.toLowerCase());
        if (match) {
            return path.join(BASE_DIR, match);
        }
    } catch (e) { }

    return null;
};

app.post('/api/command', async (req, res) => {
    const { command } = req.body;
    console.log(`[CMD] "${command}"`);
    const lowerCmd = command.toLowerCase();

    let responseText = "";

    try {
        // --- 1. PARSE INPUT ---

        // Email
        const emailMatch = command.match(/[\w.-]+@[\w.-]+\.\w+/);
        const email = emailMatch ? emailMatch[0] : null;

        // Path / Filename extraction
        // We look for patterns like "C:\Users..." or just filenames ending with extension
        let detectedFile = null;

        // Regex for absolute path
        const absPathRegex = /(?:["'])([a-zA-Z]:\\[^"']+)(?:["'])|([a-zA-Z]:\\[\w\-. \\]+)/;
        const absMatch = command.match(absPathRegex);
        if (absMatch) detectedFile = resolveFile(absMatch[1] || absMatch[2]);

        // Regex for filename with extension
        if (!detectedFile) {
            const fileExtRegex = /\b[\w\-. ]+\.[a-zA-Z0-9]{2,4}\b/;
            const extMatch = command.match(fileExtRegex);
            if (extMatch) detectedFile = resolveFile(extMatch[0]);
        }

        // Update Session
        if (detectedFile) session.file = detectedFile;
        else if (command.includes('this') && session.file) {
            // "Share this" implies using previous file
        } else if (!command.includes('this') && !email) {
            // New command without file might reset file? No, keep it sticky unless replaced.
        }

        // Detect Intent
        let intent = session.action;
        if (lowerCmd.includes('share') || lowerCmd.includes('send') || lowerCmd.includes('mail')) intent = 'share';
        if (lowerCmd.includes('delete') || lowerCmd.includes('remove')) intent = 'delete';
        if (lowerCmd.includes('open') || lowerCmd.includes('launch')) intent = 'open';

        session.action = intent;

        console.log(`[STATE] Action: ${session.action}, File: ${session.file}, Email: ${email}`);

        // --- 2. EXECUTE ---

        if (!session.action) {
            responseText = "I'm listening. You can ask me to Open, Share, or Delete files.";
        }

        // DELETE
        else if (session.action === 'delete') {
            if (session.file) {
                try {
                    // REAL TIME DELETION
                    fs.unlinkSync(session.file);
                    responseText = `SUCCESS: Permanently deleted "${path.basename(session.file)}".`;
                    session.file = null;
                    session.action = null;
                } catch (e) {
                    responseText = `Error deleting: ${e.message}`;
                }
            } else {
                responseText = "Which file do you want to delete?";
            }
        }

        // OPEN
        else if (session.action === 'open') {
            if (session.file) {
                if (open) await open(session.file);
                else exec(`start "" "${session.file}"`);
                responseText = `Opening "${path.basename(session.file)}"...`;
                session.action = null; // Done
            } else {
                responseText = "Which file should I open?";
            }
        }

        // SHARE (EMAIL)
        else if (session.action === 'share') {
            if (session.file && email) {
                // OPEN MAIL CLIENT REAL TIME
                const subject = `Sharing ${path.basename(session.file)}`;
                const body = `Please find attached: ${session.file}`;
                const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                if (open) await open(mailtoLink);
                else exec(`start "" "${mailtoLink}"`);

                responseText = `I've opened your default mail client to draft an email to ${email}. (Note: You'll need to drag the file "${path.basename(session.file)}" into it manually, as 'mailto' doesn't support attachments automatically).`;

                session.action = null;
            }
            else if (session.file) {
                responseText = `I have "${path.basename(session.file)}". Who's the email for?`;
            }
            else if (email) {
                responseText = `Sending to ${email}. What file?`;
            }
            else {
                responseText = "Share which file to whom?";
            }
        }

    } catch (e) {
        console.error(e);
        responseText = `System Error: ${e.message}`;
    }

    setTimeout(() => {
        res.json({ response: responseText });
    }, 500);
});

app.listen(PORT, () => {
    console.log(`System Bot v2.0 running on ${PORT}`);
});
