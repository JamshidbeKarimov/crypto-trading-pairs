// src/app/components/CryptoDashboard.tsx
'use client';

import { useState } from 'react';
import AverageTickerValue from './AverageTickerValue';
import TradingPairs from './TradingPairs';
import TickerInfo from './TickerInfo';

const CryptoDashboard = () => {
    const [selectedPair, setSelectedPair] = useState(null);

    return (
        <div style={{ display: 'flex'}}>
            <div style={{ flex: 1, padding: '20px' }}>
                <AverageTickerValue selectedPair={selectedPair} />
            </div>
            <div style={{ flex: 1, padding: '20px' }}>
                <TradingPairs onSelect={setSelectedPair} />
                <TickerInfo selectedPair={selectedPair} />
            </div>
        </div>
    );
};

export default CryptoDashboard;
