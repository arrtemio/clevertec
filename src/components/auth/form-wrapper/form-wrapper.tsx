import React from 'react';

import styles from './form-wrapper.module.scss';

export const FormWrapper = ({children}: {children: React.ReactNode}) => (
    <div className={styles.wrapper}>
      {children}
    </div>
);
