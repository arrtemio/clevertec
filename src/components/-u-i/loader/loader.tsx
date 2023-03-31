import React from 'react';

import styles from './loader.module.scss';

import Load from '../../../static/assets/icons/loader.svg';

export const Loader = () => (
    <div
      className={styles.wrapper}
      data-test-id='loader'
    >
      <div className={styles.loader}>
        <img src={Load} alt="Loader"/>
      </div>
    </div>
);
