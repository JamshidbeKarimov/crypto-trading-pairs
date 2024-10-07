// src/app/api/ticker/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

const BITSTAMP_TICKER_URL = 'https://www.bitstamp.net/api/v2/ticker/';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const pair = searchParams.get('pair');
    console.log("pair ", pair);

    if (typeof pair !== 'string') {
        return NextResponse.json({ error: 'Invalid currency pair.' }, { status: 400 });
    }

    try {
        const response = await axios.get(`${BITSTAMP_TICKER_URL}${pair}/`);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error(`Error fetching ticker for ${pair}:`, error);
        return NextResponse.json({ error: `Failed to fetch ticker for ${pair}.` }, { status: 500 });
    }
}
