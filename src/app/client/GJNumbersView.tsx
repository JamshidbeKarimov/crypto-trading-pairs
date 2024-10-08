'use client';

import GJNumberLabel from './GJNumberLabel';
import styles from '../styles/GJNumbersView.module.css';

interface GJNumbersViewProps {
    title: string;
    numbers: { number: string | number; description: string }[];
}

const GJNumbersView = ({ title, numbers }: GJNumbersViewProps) => {
    return (
        <div className={styles.numbersViewContainer}>
            <h2 className={styles.numbersViewTitle}>{title}</h2>
            <div className={styles.numbersGrid}>
                {numbers.map((item, index) => (
                    <GJNumberLabel key={index} number={item.number} description={item.description} />
                ))}
            </div>
        </div>
    );
};

export default GJNumbersView;
