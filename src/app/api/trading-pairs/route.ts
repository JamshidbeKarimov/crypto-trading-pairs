// src/app/api/trading-pairs/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

const BITSTAMP_TRADING_PAIRS_URL = 'https://www.bitstamp.net/api/v2/trading-pairs-info/';

export async function GET() {
    try {
        console.log('Fetching trading pairs...');
        const response = await axios.get(BITSTAMP_TRADING_PAIRS_URL);
        console.log('Response data:', response.data);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching trading pairs:', error);
        return NextResponse.json({ error: 'Failed to fetch trading pairs.' }, { status: 500 });
    }
}
