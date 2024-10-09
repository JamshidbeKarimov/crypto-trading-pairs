import { NextResponse } from 'next/server';
import axios from 'axios';

const BITSTAMP_BASE_URL = 'https://www.bitstamp.net/api/v2/ticker/';
const COINBASE_BASE_URL = 'https://api.coinbase.com/v2/exchange-rates?currency=';
const BITFINEX_BASE_URL = 'https://api-pub.bitfinex.com/v2/tickers?symbols=';

interface ApiStatus {
    bitstamp: boolean;
    coinbase: boolean;
    bitfinex: boolean;
}

interface ApiResult {
    name: keyof ApiStatus;
    price: number | null;
}

const fetchBitstampPrice = async (from: string, to: string): Promise<ApiResult> => {
    const bitstampUrl = `${BITSTAMP_BASE_URL}${from.toLowerCase()}${to.toLowerCase()}`;
    try {
        const res = await axios.get(bitstampUrl);
        const price = parseFloat(res.data.last);
        if (!isNaN(price)) return { name: 'bitstamp', price };
    } catch (error) {
        console.error('Bitstamp API failed:', error);
    }
    return { name: 'bitstamp', price: null };
};

const fetchCoinbasePrice = async (from: string, to: string): Promise<ApiResult> => {
    const coinbaseUrl = `${COINBASE_BASE_URL}${from}`;
    try {
        const res = await axios.get(coinbaseUrl);
        const price = 1 / parseFloat(res.data.data.rates[to]);
        if (!isNaN(price)) return { name: 'coinbase', price };
    } catch (error) {
        console.error('Coinbase API failed:', error);
    }
    return { name: 'coinbase', price: null };
};

const fetchBitfinexPrice = async (from: string, to: string): Promise<ApiResult> => {
    const bitfinexUrl = `${BITFINEX_BASE_URL}t${from}${to}`;
    try {
        const res = await axios.get(bitfinexUrl);
        const price = parseFloat(res.data[0][1]);
        if (!isNaN(price)) return { name: 'bitfinex', price };
    } catch (error) {
        console.error('Bitfinex API failed:', error);
    }
    return { name: 'bitfinex', price: null };
};

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get('from')?.toUpperCase();
    const to = searchParams.get('to')?.toUpperCase();

    if (!from || !to) {
        return NextResponse.json({ error: 'Invalid currency pair.' }, { status: 400 });
    }

    const results = await Promise.all([
        fetchBitstampPrice(from, to),
        fetchCoinbasePrice(from, to),
        fetchBitfinexPrice(from, to),
    ]);

    const validPrices = results.filter(({ price }) => price !== null).map(({ price }) => price as number);
    const apiStatus = results.reduce((status, { name, price }) => {
        status[name] = price !== null;
        return status;
    }, {} as ApiStatus);

    if (validPrices.length === 0) {
        return NextResponse.json({ error: 'No valid data available for the selected pair.' }, { status: 404 });
    }

    const averagePrice = validPrices.reduce((sum, price) => sum + price, 0) / validPrices.length;

    return NextResponse.json({
        averagePrice: averagePrice.toFixed(2),
        apiStatus,
    });
}
