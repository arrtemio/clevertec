import React, { useState } from 'react';
import MediaQuery from 'react-responsive';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import { Book, Comment } from '../../../types/IPofile';

import styles from './books-history.module.scss';

import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

import { Modal } from '../../modal/modal';
import { RateBook } from '../../rate-book/rate-book';
import { HistoryCard } from '../hisory-card/history-card';

interface HistoryProps {
  books: Book[];
  comments: Comment[];
}

export const BooksHistory: React.FC<HistoryProps> = ({books, comments}) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [bookId, setBookId] = useState<string>('');
  const [comment, setComment] = useState<Comment | null | undefined>(null);

  return (
    <>
      {isReviewModalOpen &&
      <Modal data='modal-rate-book' close={() => {
        setIsReviewModalOpen(false);
        setBookId('');
        setComment(null);
      }}>
        <RateBook
          from='profile'
          bookId={bookId}
          close={() => {
            setIsReviewModalOpen(false);
            setBookId('');
            setComment(null);
          }}
          comment={comment ? comment : null}
        />
      </Modal>
      }
      <div className={styles.wrapper}>
        <MediaQuery minWidth={1050}>
          <Swiper
            style={books.length < 5 ? { cursor: 'default' } : undefined}
            slidesPerView={4}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className='mySwiper3'
          >
            {books.map(book =>
              <SwiperSlide key={book.id} data-test-id='history-slide'>
                <HistoryCard
                  openModal={() => setIsReviewModalOpen(true)}
                  setComment={setComment}
                  setBook={setBookId}
                  book={book}
                  comment={
                    comments.find(comment => comment.bookId === book.id)
                      ? comments.find(comment => comment.bookId === book.id)
                      : null
                  }
                />
              </SwiperSlide>
            )}
          </Swiper>
        </MediaQuery>
        <MediaQuery maxWidth={1049} minWidth={586}>
          <Swiper
            slidesPerView={3}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className='mySwiper3'
          >
            {books.map(book =>
              <SwiperSlide key={book.id} data-test-id='history-slide' >
                <HistoryCard
                  openModal={() => setIsReviewModalOpen(true)}
                  setComment={setComment}
                  setBook={setBookId}
                  book={book}
                  comment={
                    comments.find(comment => comment.bookId === book.id)
                      ? comments.find(comment => comment.bookId === book.id)
                      : null
                  }
                />
              </SwiperSlide>
            )}
          </Swiper>
        </MediaQuery>
        <MediaQuery maxWidth={585}>
          <Swiper
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className='mySwiper3'
          >
            {books.map(book =>
              <SwiperSlide key={book.id} data-test-id='history-slide'>
                <HistoryCard
                  openModal={() => setIsReviewModalOpen(true)}
                  setComment={setComment}
                  setBook={setBookId}
                  book={book}
                  comment={
                    comments.find(comment => comment.bookId === book.id)
                      ? comments.find(comment => comment.bookId === book.id)
                      : null
                  }
                />
              </SwiperSlide>
            )}
          </Swiper>
        </MediaQuery>
      </div>
    </>
  );
}
