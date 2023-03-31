import React from 'react';

import styles from '../form-wrapper/form-wrapper.module.scss';

export const FormWrapperMessage = ({children}: {children: React.ReactNode}) => (
  <div className={styles.wrapper_message}>
    {children}
  </div>
);

