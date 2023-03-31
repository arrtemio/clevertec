import React from 'react';

import { getShortDate } from '../../../helpers/date-transform';

import styles from './order-button.module.scss';

interface OrderButtonProps {
  isFree: boolean;
  orderByUser: boolean;
  action?: any;
  delivery: string | null;
}

export const OrderButton: React.FC<OrderButtonProps> =
  ({ isFree, orderByUser, action, delivery}) => {

  const date = delivery ? getShortDate(delivery) : null;

  if ((!isFree || delivery) && !orderByUser) {
    return (
      <button
        data-test-id='booking-button'
        type='button'
        disabled={true}
        className={`${styles.button} ${styles.button__booked}`}
      >
        {delivery ? `ЗАНЯТА ДО ${date}` : 'забронирована'}
      </button>
    )
  }

  if (!isFree && orderByUser) {
    return (
      <button
        data-test-id='booking-button'
        type='button'
        disabled={false}
        className={`${styles.button} ${styles.button__order_user}`}
        onClick={(event) => {
          event.stopPropagation();
          if (action) {
            action()
          }
        }}
      >
        забронирована
      </button>
    )
  }
  return (
    <button
      type='button'
      data-test-id='booking-button'
      className={`${styles.button} ${styles.button__free}`}
      disabled={false}
      onClick={(event) => {
        event.stopPropagation();
        if (action) {
          action()
        }
      }}
    >
      забронировать
    </button>
  );

}
