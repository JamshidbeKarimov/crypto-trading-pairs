'use client';

import { useEffect, useState } from 'react';
import styles from '../styles/AverageTickerValue.module.css'; // Import the CSS module

interface SelectedPair {
    from: string;
    to: string;
}

interface AverageTickerValueProps {
    selectedPair: SelectedPair | null;
}

const AverageTickerValue = ({ selectedPair }: AverageTickerValueProps) => {
    const [averagePrice, setAveragePrice] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [apiStatus, setApiStatus] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const fetchAverageTicker = async () => {
            if (!selectedPair) return;

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/average-ticker?from=${selectedPair.from}&to=${selectedPair.to}`);
                const data = await response.json();

                if (response.ok) {
                    setAveragePrice(data.averagePrice);
                    setApiStatus(data.apiStatus); // Add API status to the UI
                } else {
                    throw new Error(data.error || 'Unknown error');
                }
            } catch (error) {
                console.error('Failed to fetch average ticker:', error);
                setError('Failed to fetch average ticker value.');
            } finally {
                setLoading(false);
            }
        };

        fetchAverageTicker();
    }, [selectedPair]);

    return (
        <div className={styles.averageTickerContainer}>
            <h2>Average Ticker Value</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className={styles.errorMessage}>{error}</p>
            ) : (
                <div>
                    {averagePrice ? (
                        <p className={styles.price}>
                            <strong>{averagePrice}</strong> {selectedPair?.to}
                        </p>
                    ) : (
                        <p>Select a trading pair to see the average value.</p>
                    )}

                    {/* Show API status */}
                    <div className={styles.apiStatus}>
                        <p>Calculated from:</p>
                        <ul>
                            <li>Bitstamp: {apiStatus.bitstamp ? '✅' : '❌'}</li>
                            <li>Coinbase: {apiStatus.coinbase ? '✅' : '❌'}</li>
                            <li>Bitfinex: {apiStatus.bitfinex ? '✅' : '❌'}</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AverageTickerValue;
