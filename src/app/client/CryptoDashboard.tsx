'use client';

import { useState } from 'react';
import AverageTickerValue from './AverageTickerValue';
import TradingPairs from './TradingPairs';
import TickerInfo from './TickerInfo';

// Define the type for the selected pair
interface SelectedPair {
    from: string;
    to: string;
}

const CryptoDashboard = () => {
    // Allow selectedPair to be either null or a SelectedPair object
    const [selectedPair, setSelectedPair] = useState<SelectedPair | null>(null);

    return (
        <div style={{ display: 'flex'}}>
            <div style={{ flex: 1, padding: '20px' }}>
                <AverageTickerValue selectedPair={selectedPair} />
            </div>
            <div style={{ flex: 1, padding: '20px' }}>
                <TradingPairs onSelect={setSelectedPair} /> {/* onSelect passes a pair object */}
                <TickerInfo selectedPair={selectedPair} />
            </div>
        </div>
    );
};

export default CryptoDashboard;
