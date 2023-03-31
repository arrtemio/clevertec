import React, { useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Highlighter from "react-highlight-words";

import styles from './card.module.scss';

import { IPofile } from '../../../types/IPofile';
import { IBooks } from '../../../types/IBooks';

import { Rating } from '../rating/rating';
import { Modal } from '../../modal/modal';
import { OrderBooks } from '../../order-book/order-books';
import { OrderButton } from '../order-button/order-button';

import NoCover from '../../../static/assets/covers/no_cover_list.png';

interface CardProps {
  book: IBooks;
  text: string;
  user: IPofile;
}

interface HighlightProps {
  children: string;
  highlightIndex: number;
}

const Highlight: React.FC<HighlightProps> = ({ children, highlightIndex }) => (
  <span data-test-id='highlight-matches' className='light'>{children}</span>
);

export const CardList: React.FC<CardProps> = ({ book, text,user }) => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getRedirect = () => {
    navigate( `${location}/${book.id}`);
  };

  return (
    <>
      {isModalOpen &&
        <Modal data='booking-modal' close={() => setIsModalOpen(false)}>
          <OrderBooks
            user={user}
            book={book.id.toString()}
            close={() => setIsModalOpen(false)}
            bookedDate={book?.booking?.dateOrder ? book.booking.dateOrder : null}
            bookingId={book?.booking?.id ? book.booking.id : null}
            page='allBooks'
          />
        </Modal>
      }
      <div
        role='button'
        className={styles.list}
        onClick={getRedirect}
        onKeyPress={getRedirect}
        tabIndex={0}
        data-test-id='card'
      >
        <div className={styles.img}>
          <img src={book.image ? `https://strapi.cleverland.by${book.image.url}` : NoCover} alt='Cover' />
        </div>
        <div className={styles.right}>
          <div className={styles.text}>
            <p className={styles.book_name}>
              <Highlighter
                highlightClassName='light'
                searchWords={text.split(`${text} `)}
                autoEscape={true}
                highlightTag={Highlight}
                textToHighlight={book.title}
              />
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
              <OrderButton
                isFree={book.booking === null}
                delivery={book?.delivery ? book.delivery.dateHandedTo : null}
                orderByUser={book.booking?.customerId === user.id}
                action={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
