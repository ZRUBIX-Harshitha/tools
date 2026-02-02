import { NextResponse } from 'next/server';

const MESHY_API_URL = 'https://api.meshy.ai/v1/text-to-3d';

export async function POST(req) {
    try {
        const { prompt, apiKey } = await req.json();

        if (!prompt || !apiKey) {
            return NextResponse.json({ error: 'Prompt and API Key are required' }, { status: 400 });
        }

        const payload = {
            mode: 'preview', // Quick preview mode (approx 1 min)
            prompt: prompt,
            art_style: 'realistic',
            negative_prompt: 'low quality, low resolution, low poly, ugly'
        };

        const response = await fetch(MESHY_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Meshy Generation Error:", errorData);
            return NextResponse.json(
                { error: errorData.message || 'Failed to initiate Meshy generation' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json({ result: data.result }); // Assuming structure { result: "task_id" }

    } catch (error) {
        console.error('Text-to-3D Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// GET Endpoint for Polling Status
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get('taskId');
    const apiKey = searchParams.get('apiKey');

    if (!taskId || !apiKey) {
        return NextResponse.json({ error: 'Task ID and API Key are required' }, { status: 400 });
    }

    try {
        const response = await fetch(`${MESHY_API_URL}/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return NextResponse.json(
                { error: errorData.message || 'Failed to fetch task status' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Polling Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
