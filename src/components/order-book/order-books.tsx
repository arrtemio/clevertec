import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  createOrder,
  deleteOrder,
  updateOrder,
} from '../../store/reducers/order-slice/order-actions';
import { fetchOneBook } from '../../store/reducers/book-slice/onebook-actions';
import { orderSelector } from '../../store/selectors/selectors';
import { dateTransformer } from '../../helpers/date-transform';
import { orderSlice } from '../../store/reducers/order-slice/order-slice';
import { fetchAllBooks } from '../../store/reducers/books-slice/books-actions';

import { IPofile } from '../../types/IPofile';
import { CreateOrderData } from '../../types/actions/orderTypes';

import styles from './order-book.module.scss';

import { Calendar } from '../-u-i/calendar/calendar';
import { fetchUser } from '../../store/reducers/user-slice/user-actions';

interface OrderBooksProps {
  user: IPofile;
  book: string | undefined;
  close: any;
  bookedDate: string | undefined | null
  bookingId: number | undefined | null;
  page: string;
}

export const OrderBooks: React.FC<OrderBooksProps> =
  ({
     user,
     book,
     close, bookingId,
     bookedDate,
     page}) => {

  const dispatch = useAppDispatch();
  const bookingDay = bookedDate ? new Date(bookedDate).getDate() : null
  const [orderDay, setOrderDay] = useState<number | null>(bookingDay);
  const { status } = useAppSelector(orderSelector);

  const createNewOrder = () => {
    if (orderDay) {
      const date = dateTransformer(orderDay);
      const data: CreateOrderData = {
        data: {
          order: true,
          dateOrder: date,
          book: book || '',
          customer: user.id.toString()
        }
      }
      dispatch(createOrder(data));
    }
    dispatch(page === 'oneBook' ? fetchOneBook(Number(book)) : fetchAllBooks());
    dispatch(fetchUser());
  }

  const updateCurrentOrder = () => {
    if(orderDay && bookingId) {
      const date = dateTransformer(orderDay);
      const data: CreateOrderData = {
        data: {
          order: true,
          dateOrder: date,
          book: book || '',
          customer: user.id.toString()
        }
      }
      dispatch(updateOrder(data, bookingId));
      dispatch(fetchUser());
    }
    dispatch(page === 'oneBook' ? fetchOneBook(Number(book)) : fetchAllBooks());
  }
  const deleteCurrentOrder = () => {
    if (bookingId) {
      dispatch(deleteOrder(bookingId));
      dispatch(page === 'oneBook' ? fetchOneBook(Number(book)) : fetchAllBooks());
      dispatch(fetchUser());
    }
  }

    useEffect(() => {
      if (status) {
        close()
        setTimeout(() => {
          dispatch(orderSlice.actions.clearError())
        }, 4000)
      }
    }, [status, close, dispatch]);

  return (
    <div className={styles.wrapper} >
      <h1 data-test-id='modal-title'>
        {bookingDay ? 'Изменение даты бронирования' : 'Выбор даты бронирования'}
      </h1>
      <Calendar orderDay={orderDay} setOrderDay={setOrderDay}/>
      {bookingDay
        ?
      <button
        data-test-id='booking-button'
        disabled={bookingDay === orderDay}
        className={styles.button}
        type='button'
        onClick={updateCurrentOrder}
      >
        забронировать
      </button>
        :
        <button
          disabled={!orderDay}
          data-test-id='booking-button'
          className={styles.button}
          type='button'
          onClick={createNewOrder}
        >
          забронировать
        </button>
      }
      {bookingDay &&
      <button
        data-test-id='booking-cancel-button'
        type='button'
        className={styles.button_cancel}
        onClick={deleteCurrentOrder}
      >
        отменить бронь
      </button>
      }
    </div>
  );
}
