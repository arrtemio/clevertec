import React from 'react';

import styles from './wrapper.module.scss';

export const Wrapper = ({children}: {children: React.ReactNode}) => (
    <div className={styles.wrapper} data-test-id='auth'>
      <div className={styles.wrapper__container}>
        <h3 className={styles.wrapper__name}>Cleverland</h3>
        {children}
      </div>
    </div>
);


