import { NextResponse } from 'next/server';

const HF_API_URL = 'https://api-inference.huggingface.co/models/openai/shap-e';

export async function POST(req) {
    try {
        const { prompt, apiKey } = await req.json();

        if (!prompt || !apiKey) {
            return NextResponse.json({ error: 'Prompt and HF Token are required' }, { status: 400 });
        }

        // Hugging Face Inference API call
        const response = await fetch(HF_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputs: prompt }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("HF Generation Error:", errorText);
            return NextResponse.json(
                { error: 'Failed to generate model. The model might be loading (503), please try again in a few seconds.', details: errorText },
                { status: response.status }
            );
        }

        // The response is a binary blob (GLB)
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString('base64');
        const dataUri = `data:model/gltf-binary;base64,${base64}`;

        return NextResponse.json({ modelUrl: dataUri });

    } catch (error) {
        console.error('Text-to-3D Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
