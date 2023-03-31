import React from 'react';

import styles from './empty-card.module.scss';

interface EmptyCardProps {
  text: string;

}

export const EmptyCard: React.FC<EmptyCardProps> = ({text}) => (
    <div className={styles.wrapper} data-test-id='empty-blue-card'>
      <h3>{text}</h3>
    </div>
);
