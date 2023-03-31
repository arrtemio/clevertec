import React, { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { orderSlice } from '../../store/reducers/order-slice/order-slice';
import { interactionsSlice } from '../../store/reducers/interactions-slice/interactions-slice';
import { userSlice } from '../../store/reducers/user-slice/user-slice';

import styles from './success.module.scss';

import SuccessImg from '../../static/assets/icons/success.svg';
import Close from '../../static/assets/icons/close_black.svg';

interface SuccessProps {
  text: string;
  from: string
}

export const Success: React.FC<SuccessProps> = ({text, from}) => {
  const dispatch = useAppDispatch();

  const dispatchCondition = (text: string) => {
    switch (text) {
      case 'orderBook':
        dispatch(orderSlice.actions.clearError());
        break
      case 'user':
        dispatch(userSlice.actions.clearError());
        break
      case 'rateBook':
        dispatch(interactionsSlice.actions.clearError());
        break
    }
  }

  useEffect(() => {
    setTimeout(() => {
      switch (from) {
        case 'orderBook':
          dispatch(orderSlice.actions.clearError());
          break
        case 'user':
          dispatch(userSlice.actions.clearError());
          break
        case 'rateBook':
          dispatch(interactionsSlice.actions.clearError());
          break
      }
    }, 4000);
  }, [ dispatch, from ]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.success} data-test-id='error'>
        <div className={styles.success__content}>
          <img className={styles.picture} src={SuccessImg} alt="Success"/>
          <p>{text}</p>
          <button
            type='button'
            onClick={() => dispatchCondition(from)}
            data-test-id='alert-close'
          >
            <img src={Close} alt="Close"/>
          </button>
        </div>
      </div>
    </div>
  );
}
