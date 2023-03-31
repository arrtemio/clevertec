import React from 'react';
import { dateTransformer, getShortDate, isDateOverdue } from '../../../helpers/date-transform';
import { deleteOrder } from '../../../store/reducers/order-slice/order-actions';
import { useAppDispatch } from '../../../hooks/redux';
import { fetchUser } from '../../../store/reducers/user-slice/user-actions';

import styles from '../../-u-i/card/card.module.scss';

import { Book } from '../../../types/IPofile';

import { Rating } from '../../-u-i/rating/rating';
import { Button } from '../../-u-i/button/button';
import { ErrorCard } from '../error-card/error-card';

import NoCover from '../../../static/assets/covers/no_cover_list.png';

interface CardProfileProps {
  book: Book;
  profile: string;
  bookDate: string;
  bookingId?: number;
}

export const CardProfile: React.FC<CardProfileProps> = ({ book, profile, bookDate, bookingId}) => {
  const dispatch = useAppDispatch();
  const date = bookDate ? getShortDate(bookDate) : '';
  const today = dateTransformer();
  const isOverdue = isDateOverdue(bookDate, today);

  const deleteBookOrder = () => {
    if(bookingId)
      dispatch(deleteOrder(bookingId));
      dispatch(fetchUser());
  }

  return (
    <div className={styles.list} style={{ cursor: 'default' }}>
      <div className={styles.img}>
        <img src={book.image ? `https://strapi.cleverland.by${book.image}` : NoCover} alt='Cover' />
      </div>
      <div className={styles.right}>
        <div className={styles.text}>
          <p className={styles.book_name}>
            {book.title}
          </p>
          <p className={styles.author}>
            {book.authors.join(', ')}, {book.issueYear}
          </p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.rating}>
            <Rating rating={book.rating} />
          </div>
          <div className={styles.button}>
            {profile === 'booking' &&
              <Button
                data-test-id='cancel-booking-button'
                text='Отменить бронь'
                action={() => deleteBookOrder()}
              />
            }
            {profile === 'delivery' &&
              <span className={styles.return_date} data-test-id='expired'>
                {`возврат ${date}`}
              </span>
            }
          </div>
        </div>
      </div>
      { isOverdue &&
        <ErrorCard
          title={
            profile === 'booking'
              ? 'Дата бронирования книги истекла'
              : 'Вышел срок пользования книги'
          }
          text={
            profile === 'booking'
              ? 'через 24 часа книга будет  доступна всем'
              : 'Верните книгу, пожалуйста'
          }
        />
      }
    </div>
  );
}
