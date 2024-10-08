// src/app/components/TradingPairs.tsx
'use client';

import { useEffect, useState } from 'react';
import styles from '../styles/TradingPairs.module.css'; // Import the CSS module

interface TradingPair {
    name: string;
}

interface TradingPairsProps {
    onSelect: (pair: { from: string; to: string }) => void;
}

const ITEMS_PER_PAGE = 20;

const TradingPairs = ({ onSelect }: TradingPairsProps) => {
    const [pairs, setPairs] = useState<TradingPair[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const fetchTradingPairs = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/trading-pairs');
                const data = await response.json();
                setPairs(data);
            } catch (error) {
                console.error('Failed to fetch trading pairs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTradingPairs();
    }, []);

    // Calculate the pairs to display for the current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentPairs = pairs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(pairs.length / ITEMS_PER_PAGE);

    return (
        <div className={styles.tradingPairsContainer}>
            <h2 className={styles.tradingPairsHeader}>Trading Pairs</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <ul className={styles.tradingPairsList}>
                        {currentPairs.map((pair) => (
                            <li key={pair.name}>
                                <button
                                    className={styles.tradingPairsButton}
                                    onClick={() => onSelect({ from: pair.name.split('/')[0], to: pair.name.split('/')[1] })}
                                >
                                    {pair.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                    {/* Pagination Controls */}
                    <div className={styles.pagination}>
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        >
                            Previous
                        </button>
                        <span style={{color: "black"}}>{` Page ${currentPage} of ${totalPages} `}</span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TradingPairs;
