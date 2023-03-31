import React from 'react';

import styles from './error.card.module.scss';

interface ErrorCardProps {
  title: string;
  text: string
}

export const ErrorCard: React.FC<ErrorCardProps> = ({title, text}) => (
  <div className={styles.wrapper} data-test-id='expired'>
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
);
