import React, { useEffect } from 'react';

import { useAppDispatch } from '../../../hooks/redux';
import { oneBookSlice } from '../../../store/reducers/book-slice/onebook-slice';
import { booksSlice } from '../../../store/reducers/books-slice/books-slice';
import { orderSlice } from '../../../store/reducers/order-slice/order-slice';
import { interactionsSlice } from '../../../store/reducers/interactions-slice/interactions-slice';

import styles from './error.module.scss';

import Warning from '../../../static/assets/icons/warning.svg';
import Close from '../../../static/assets/icons/close_black.svg';
import { userSlice } from '../../../store/reducers/user-slice/user-slice';

interface ErrorProps {
  text: string;
  from: string;
}

export const Error: React.FC<ErrorProps> = ({text, from}) => {
 const dispatch = useAppDispatch();

 const dispatchCondition = (text: string) => {
   switch (text) {
     case 'orderBook':
       dispatch(orderSlice.actions.clearError())
       break;
     case 'rateBook':
       dispatch(interactionsSlice.actions.clearError())
       break
     case 'oneBook':
       dispatch(oneBookSlice.actions.clearBookState())
       break
     case 'allBooks':
       dispatch(booksSlice.actions.clearError());
       break
     case 'user':
       dispatch(userSlice.actions.clearError());
       break
     default:
       dispatch(booksSlice.actions.clearError());
       break
   }
 }

  useEffect(() => {
     if (from) {
       setTimeout(() => {
         switch (from) {
           case 'orderBook':
             dispatch(orderSlice.actions.clearError())
             break;
           case 'rateBook':
             dispatch(interactionsSlice.actions.clearError())
             break
           case 'oneBook':
             dispatch(oneBookSlice.actions.clearBookState())
              break
           case 'allBooks':
             dispatch(booksSlice.actions.clearError());
              break
           case 'user':
             dispatch(userSlice.actions.clearError());
             break
           default:
             dispatch(booksSlice.actions.clearError());
              break
         }
       }, 4000);
     }
  }, [ from, dispatch ]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.error} data-test-id='error'>
        <div className={styles.error__content}>
          <img className={styles.warning} src={Warning} alt="Warning"/>
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
