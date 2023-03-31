import React from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { userSelector } from '../../../store/selectors/selectors';

import styles from './view.module.scss';

import { IBooks } from '../../../types/IBooks';

import { CardTile } from '../card/card-tile';
import { CardList } from '../card/card-list';

interface ViewProps {
  isTile: boolean;
  books: IBooks[];
  text: string;
}

export const View: React.FC<ViewProps> = ({ isTile, books, text }) => {
  const { user } = useAppSelector(userSelector);

  const renderCard = (book: IBooks) =>
    isTile ? (
      <CardTile text={text} key={book.id} book={book} user={user} />
    ) : (
      <CardList text={text} key={book.id} book={book} user={user} />
    );

  return (
    <main className={isTile ? styles.tile : styles.list} data-test-id="content">
      {books.map(renderCard)}
    </main>
  );
};

