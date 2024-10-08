'use client';

import styles from '../styles/GJNumberLabel.module.css';

interface GJNumberLabelProps {
    number: string | number;
    description: string;
}

const GJNumberLabel = ({ number, description }: GJNumberLabelProps) => {
    return (
        <div className={styles.numberLabelContainer}>
            <strong className={styles.numberLabelDescription}>{description}</strong>: {number}
        </div>
    );
};

export default GJNumberLabel;
