// src/app/api/average-ticker/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

const BITSTAMP_BASE_URL = 'https://www.bitstamp.net/api/v2/ticker/';
const COINBASE_BASE_URL = 'https://api.coinbase.com/v2/exchange-rates?currency=';
const BITFINEX_BASE_URL = 'https://api-pub.bitfinex.com/v2/tickers?symbols=';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    if (typeof from !== 'string' || typeof to !== 'string') {
        return NextResponse.json({ error: 'Invalid currency pair.' }, { status: 400 });
    }

    // Construct the URLs dynamically based on the 'from' and 'to' currencies
    const bitstampUrl = `${BITSTAMP_BASE_URL}${from.toLowerCase()}${to.toLowerCase()}`;
    const coinbaseUrl = `${COINBASE_BASE_URL}${from.toUpperCase()}`;
    const bitfinexUrl = `${BITFINEX_BASE_URL}t${from.toUpperCase()}${to.toUpperCase()}`;

    try {
        // Fetch data from the 3 APIs
        const [bitstampRes, coinbaseRes, bitfinexRes] = await Promise.all([
            axios.get(bitstampUrl),
            axios.get(coinbaseUrl),
            axios.get(bitfinexUrl),
        ]);

        // Extract relevant data
        const bitstampPrice = parseFloat(bitstampRes.data.last);
        const coinbaseRate = parseFloat(coinbaseRes.data.data.rates[to.toUpperCase()]);
        const bitfinexPrice = parseFloat(bitfinexRes.data[0][1]); // second element is the last price

        // Calculate the average price
        const averagePrice = (bitstampPrice + (1 / coinbaseRate) + bitfinexPrice) / 3;

        // Respond with the average price
        return NextResponse.json({ averagePrice: averagePrice.toFixed(2) });
    } catch (error) {
        console.error('Error fetching ticker data:', error);
        return NextResponse.json({ error: 'Failed to fetch ticker data' }, { status: 500 });
    }
}
