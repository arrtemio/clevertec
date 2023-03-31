import React, { useState } from 'react';
import Highlighter from "react-highlight-words";
import {useLocation, useNavigate} from 'react-router-dom';

import styles from './card.module.scss';
import { IBooks } from '../../../types/IBooks';
import { IPofile } from '../../../types/IPofile';

import { OrderButton } from '../order-button/order-button';
import { Rating } from '../rating/rating';
import { Modal } from '../../modal/modal';
import { OrderBooks } from '../../order-book/order-books';

import NoCover from '../../../static/assets/covers/no_cover_card.png';
import { useAppDispatch } from '../../../hooks/redux';
import { fetchOneBook } from '../../../store/reducers/book-slice/onebook-actions';

interface CardTileProps {
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

export const CardTile: React.FC<CardTileProps> = ({ book, text ,user}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation().pathname;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getRedirect = () => {
    navigate( `${location}/${book.id.toString()}`);
    dispatch(fetchOneBook(book.id));
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
        className={styles.tile}
        onClick={getRedirect}
        onKeyPress={getRedirect}
        tabIndex={0}
        data-test-id='card'
      >
        <div className={styles.wrapper}>
          <div className={styles.img}>
            <img src={book.image ? `https://strapi.cleverland.by${book.image.url}` : NoCover} alt='Cover' />
          </div>
          <div className={styles.rating}>
            <Rating rating={book.rating} />
          </div>
          <div className={styles.text}>
            <div className={styles.book_name}>
              <p>
                <Highlighter
                  highlightClassName='light'
                  searchWords={text.split(`${text} `)}
                  autoEscape={true}
                  highlightTag={Highlight}
                  textToHighlight={book.title}
                />
              </p>
            </div>
            <div className={styles.author}>
              <p>
                {book.authors ? book.authors.join(', ') : ''}, {book.issueYear}
              </p>
            </div>
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
    </>
  );
};
