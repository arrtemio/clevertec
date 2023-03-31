import React from 'react';
import { Link } from 'react-router-dom';

import styles from './bottom-link.module.scss';
import ArrowRight from '../../../static/assets/icons/arrow_right.svg';

interface BottomLinkProps {
  text: string;
  to: string;
  path: string;
}

export const BottomLink: React.FC<BottomLinkProps> = ({text, to, path}) => (
    <div className={styles.bottom}>
      <span className={styles.bottom__text}>{text}</span>
      <Link to={path}  className={styles.bottom__link}>
        <span>{to}</span> <img src={ArrowRight} alt='Arrow' />
      </Link>
    </div>
);

