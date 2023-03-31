import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createReview, updateReview } from '../../store/reducers/interactions-slice/interactions-actions';
import { fetchOneBook } from '../../store/reducers/book-slice/onebook-actions';
import { interactionsSelector, userSelector } from '../../store/selectors/selectors';

import { CreateReviewData } from '../../types/actions/createReviewTypes';
import { Comment } from '../../types/IPofile';

import styles from './rate-book.module.scss';

import { StarRating } from '../-u-i/star-rating/star-rating';
import { fetchUser } from '../../store/reducers/user-slice/user-actions';

interface RateBookProps {
  close: any;
  bookId: string;
  comment: Comment | null | undefined;
  from: string;
}

export const RateBook: React.FC<RateBookProps> = ({close, bookId, comment, from}) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>(comment ? comment.text : '');
  const [rating, setRating] = useState<number | null>(comment ? comment.rating : 5);
  const { status } = useAppSelector(interactionsSelector);
  const { user } = useAppSelector(userSelector);

  const sendReview = () => {
    const data: CreateReviewData = {
      data: {
        rating: rating ? rating : 0,
        text,
        book: bookId,
        user: user.id.toString()
      }
    }
    dispatch(createReview(data));
    dispatch(fetchUser());
    // if (from === 'oneBook') {
      dispatch(fetchOneBook(Number(bookId)))
    // }
  }
  const sendUpdateReview = () => {
    if (comment) {
      const data: CreateReviewData = {
        data: {
          rating: rating ? rating : 0,
          text,
          book: bookId,
          user: user.id.toString()
        }
      }
      dispatch(updateReview(comment?.id.toString(), data));
      dispatch(fetchUser());
      // if (from === 'oneBook') {
        dispatch(fetchOneBook(Number(bookId)));
      // }
    }
  }

  useEffect(() => {
    if (status) {
      close()
    }
  }, [status, close])

  return (
    <div className={styles.wrapper}>
      <h1 data-test-id='modal-title'>Оцените книгу</h1>
      <p>Ваша оценка</p>
      <StarRating setRating={setRating} rating={rating}/>
      <textarea
        data-test-id='comment'
        value={text}
        onChange={event => setText(event.target.value)}
        placeholder='Оставить отзыв'
      />
      <button
        type='button'
        onClick={comment ? sendUpdateReview : sendReview}
        data-test-id='button-comment'
      >
        оценить
      </button>
    </div>
  );
}

