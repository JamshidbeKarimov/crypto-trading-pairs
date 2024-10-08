// src/app/components/TickerInfo.tsx
'use client';

import { useEffect, useState } from 'react';
import GJNumbersView from './GJNumbersView';

interface TickerInfoProps {
    selectedPair: { from: string; to: string } | null;
}

const TickerInfo = ({ selectedPair }: TickerInfoProps) => {
    const [tickerData, setTickerData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchTicker = async () => {
            if (!selectedPair) return;

            setLoading(true);
            const pair = `${selectedPair.from.toLowerCase()}${selectedPair.to.toLowerCase()}`;
            try {
                const response = await fetch(`/api/ticker?pair=${pair}`);
                const data = await response.json();
                setTickerData(data);
            } catch (error) {
                console.error('Failed to fetch ticker data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTicker();
    }, [selectedPair]);

    if (loading) {
        return <p>Loading ticker info...</p>;
    }

    if (!tickerData) {
        return <p>Select a trading pair to see the ticker info.</p>;
    }

    const numberDescriptionList = [
        { number: tickerData.open, description: 'Open' },
        { number: tickerData.high, description: 'High' },
        { number: tickerData.low, description: 'Low' },
        { number: tickerData.last, description: 'Last' },
        { number: tickerData.volume, description: 'Volume' },
        { number: tickerData.vwap, description: 'VWAP' },
        { number: tickerData.bid, description: 'Bid' },
        { number: tickerData.ask, description: 'Ask' },
        { number: tickerData.open_24, description: 'Open (24h)' },
        { number: tickerData.percent_change_24, description: 'Percent Change (24h)' },
    ];

    return <GJNumbersView title={`Ticker Info for ${selectedPair.from}/${selectedPair.to}`} numbers={numberDescriptionList} />;
};

export default TickerInfo;
