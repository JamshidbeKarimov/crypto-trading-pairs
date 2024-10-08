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

    if (!from || !to) {
        return NextResponse.json({ error: 'Invalid currency pair.' }, { status: 400 });
    }

    // Construct the URLs dynamically based on the 'from' and 'to' currencies
    const bitstampUrl = `${BITSTAMP_BASE_URL}${from.toLowerCase()}${to.toLowerCase()}`;
    const coinbaseUrl = `${COINBASE_BASE_URL}${from.toUpperCase()}`;
    const bitfinexUrl = `${BITFINEX_BASE_URL}t${from.toUpperCase()}${to.toUpperCase()}`;

    let prices = [];
    let apiStatus = {
        bitstamp: false,
        coinbase: false,
        bitfinex: false,
    };

    try {
        const bitstampRes = await axios.get(bitstampUrl);
        const bitstampPrice = parseFloat(bitstampRes.data.last);
        if (!isNaN(bitstampPrice)) {
            prices.push(bitstampPrice);
            apiStatus.bitstamp = true; // Mark as valid
        }
    } catch (error) {
        console.error('Bitstamp API failed:', error);
    }

    try {
        const coinbaseRes = await axios.get(coinbaseUrl);
        const coinbaseRate = parseFloat(coinbaseRes.data.data.rates[to.toUpperCase()]);
        if (!isNaN(coinbaseRate)) {
            prices.push(1 / coinbaseRate);
            apiStatus.coinbase = true; // Mark as valid
        }
    } catch (error) {
        console.error('Coinbase API failed:', error);
    }

    try {
        const bitfinexRes = await axios.get(bitfinexUrl);
        const bitfinexPrice = parseFloat(bitfinexRes.data[0][1]); // second element is the last price
        if (!isNaN(bitfinexPrice)) {
            prices.push(bitfinexPrice);
            apiStatus.bitfinex = true; // Mark as valid
        }
    } catch (error) {
        console.error('Bitfinex API failed:', error);
    }

    if (prices.length === 0) {
        return NextResponse.json({ error: 'No valid data available for the selected pair.' }, { status: 404 });
    }

    // Calculate the average price (excluding APIs that failed)
    const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;

    // Respond with the average price and which APIs were used
    return NextResponse.json({
        averagePrice: averagePrice.toFixed(2),
        apiStatus,
    });
}
