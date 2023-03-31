import React from 'react';

import styles from './modal.module.scss';

import Close from '../../static/assets/icons/close.svg';

interface ModalProps {
  close: any;
  children: JSX.Element | React.ReactNode | string ;
  data: string
}

export const Modal: React.FC<ModalProps> = ({close, children,data}) => (
    <div
      data-test-id='modal-outer'
      className={styles.modal}
      onClick={() => close()}
      tabIndex={0}
      onKeyPress={() => close()}
      role='button'
    >
      <div
        data-test-id={data}
        className={styles.modal__menu}
        onClick={(event) => event.stopPropagation()}
        tabIndex={0}
        onKeyPress={(event) => event.stopPropagation()}
        role='button'
      >
        <button
          data-test-id='modal-close-button'
          className={styles.close}
          type='button'
          onClick={(event) => {
            event.stopPropagation();
            close();
          }}
        >
          <img src={Close} alt='Close' />
        </button>
        {children}
      </div>
    </div>
);

