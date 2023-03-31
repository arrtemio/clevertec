import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { oneBookSelector, userSelector } from '../../store/selectors/selectors';
import { interactionsSlice } from '../../store/reducers/interactions-slice/interactions-slice';
import { getShortGenre } from '../../helpers/genre-reanslater';
import { fetchOneBook } from '../../store/reducers/book-slice/onebook-actions';

import styles from './book-page.module.scss';

import Arrow from '../../static/assets/icons/arrow.svg';

import { OrderButton } from '../../components/-u-i/order-button/order-button';
import { Rating } from '../../components/-u-i/rating/rating';
import { Review } from '../../components/-u-i/review/review';
import { FullInfo } from '../../components/-u-i/full-info/full-info';
import { Button } from '../../components/-u-i/button/button';
import { Slider }  from '../../components/-u-i/slider/slider';
import { Modal } from '../../components/modal/modal';
import { RateBook } from '../../components/rate-book/rate-book';
import { OrderBooks } from '../../components/order-book/order-books';

export const BookPage = () => {
  const {id, genre} = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOneBook(Number(id)));
    dispatch(interactionsSlice.actions.clearError());
  }, [ dispatch, id ]);

  const [isRevShow, setIsRevShow] = useState<boolean>(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const {
    book,
    isLoading: bookLoading,
    error: bookError,
  } = useAppSelector(oneBookSelector);
  const { user } = useAppSelector(userSelector);

  const openReviewModal = () => {
    dispatch(interactionsSlice.actions.clearError())
    setIsReviewModalOpen(true);
  }

  return (
  <section className={styles.wrapper}>
    <nav className={styles.nav}>
        <div className={styles.nav__text}>
          <Link
            data-test-id='breadcrumbs-link'
            to={`../books/${genre}`}
          >
            {getShortGenre(genre ? genre : 'all')}
          </Link>
          <span>&emsp;/&emsp;</span>
          <span data-test-id='book-name'>{book?.title ? book.title : ''}</span>
        </div>
      </nav>
    { !bookLoading && !bookError &&
      <div className={styles.book}>
      <div className={styles.book__info}>
        <div className={styles.slider}>
          <Slider images={book?.images ? book.images : null} />
        </div>
        <div className={styles.book__info_text}>
          <h3 data-test-id='book-title'>{book?.title}</h3>
          <h5 className={styles.author}>
            {(book !== null && book.authors) ? book.authors.join(', ') : ''}, {book?.issueYear}
          </h5>
          <OrderButton
            isFree={book?.booking === null}
            orderByUser={book?.booking?.customerId === user.id}
            action={() => setIsOrderModalOpen(true)}
            delivery={book?.delivery ? book.delivery.dateHandedTo : null}
          />
        </div>
        <div className={styles.about}>
          <h5>О книге</h5>
          <p className={styles.about__frst}>{book?.description}</p>
        </div>
      </div>
      <h5>Рейтинг</h5>
      <hr />
      <div className={styles.rating}>
        <Rating rating={book?.rating} />
        <h5>
          {book?.rating ?
            Number.isInteger(book?.rating)
              ? book?.rating
              : book?.rating.toFixed(1)
            : ''
          }
        </h5>
      </div>
      <h5>Подробная информация</h5>
      <hr />
      <FullInfo info={book ? book : undefined} />
      <div className={styles.review_text}>
        <h5>Отзывы</h5>
        <span>{book?.comments?.length}</span>
        {book?.comments &&
        <button
          type='button'
          onClick={() => setIsRevShow(!isRevShow)}
          data-test-id='button-hide-reviews'
        >
          <img
            className={isRevShow ? styles.arrow : ''}
            src={Arrow}
            alt='Arrow' />
        </button>
        }
      </div>
      {isRevShow && <hr />}
      {
        (book?.comments && isRevShow) && <Review comments={book.comments} />
      }{ !bookLoading &&
        <Button
          disabled={false}
          isBookHasComment={
            !!user.comments.find(comment => Number(comment.bookId) === Number(id))
          }
          text={
            user.comments.find(comment => Number(comment.bookId) === Number(id))
              ? 'Изменить оценку'
              : 'Оценить книгу'
          }
          action={openReviewModal}
          dataTestId='button-rate-book'
        />}
    </div>}
    {isReviewModalOpen &&
      <Modal data='modal-rate-book' close={() => setIsReviewModalOpen(false)}>
        <RateBook
          from='oneBook'
          bookId={id ? id : ''}
          close={() => setIsReviewModalOpen(false)}
          comment={
            user.comments?.find(comment => Number(comment.bookId) === Number(id))
              ? user.comments.find(comment => Number(comment.bookId) === Number(id))
              : null
          }
        />
      </Modal>
    }
    {isOrderModalOpen &&
      <Modal data='booking-modal' close={() => setIsOrderModalOpen(false)}>
        <OrderBooks
          close={() => setIsOrderModalOpen(false)}
          user={user}
          book={id}
          bookedDate={book?.booking?.dateOrder ? book.booking.dateOrder : null}
          bookingId={book?.booking?.id ? book.booking.id : null}
          page='oneBook'
        />
      </Modal>
    }
    </section>
  );
}
