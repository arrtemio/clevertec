import React from 'react';

import { Book, Comment } from '../../../types/IPofile';

import styles from './history-card.module.scss';

import NoCover from '../../../static/assets/covers/no_cover_card.png';

import { Rating } from '../../-u-i/rating/rating';

interface HistoryCardProps {
  book: Book;
  comment: Comment | null | undefined;
  openModal: any;
  setBook:  React.Dispatch<React.SetStateAction<string>>;
  setComment: React.Dispatch<React.SetStateAction<Comment | null | undefined>>;
}

export const HistoryCard: React.FC<HistoryCardProps> =
  ({book, comment, openModal, setBook, setComment}) => (
    <div
      className={styles.tile}
      data-test-id='card'
    >
      <div className={styles.wrapper}>
        <div className={styles.img}>
          <img src={book.image ? `https://strapi.cleverland.by${book.image}` : NoCover}
               alt='Cover' />
        </div>
        <Rating rating={book.rating} />
        <div className={styles.text}>
          <div className={styles.book_name}>
            <p>
              {book.title}
            </p>
          </div>
          <div className={styles.author}>
            <p>
              {book.authors.join(', ')}, {book.issueYear}
            </p>
          </div>
        </div>
        <div className={styles.button__container}>
          <button
            data-test-id='history-review-button'
            className={`${styles.button} ${comment ? styles.button__has : styles.button__not}`}
            type='button'
            onClick={() => {
              openModal();
              setComment(comment);
              setBook(book.id.toString())
            }}
          >
            {comment ? 'изменить оценку' : 'оценить'}
          </button>
        </div>
      </div>
    </div>
  );

