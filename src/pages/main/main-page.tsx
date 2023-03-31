import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { booksSelector, genresSelector } from '../../store/selectors/selectors';
import { fetchAllBooks } from '../../store/reducers/books-slice/books-actions';

import styles from './main-page.module.scss';

import { Menu } from '../../components/menu/menu';
import { ViewPanel } from '../../components/view-panel/view-panel';
import { Terms } from '../terms';
import { oneBookSlice } from '../../store/reducers/book-slice/onebook-slice';

export const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const {isLoading: booksLoading} = useAppSelector(booksSelector);
  const {isLoading: genresLoading} = useAppSelector(genresSelector);

  useEffect(() => {
    dispatch(fetchAllBooks());
    dispatch(oneBookSlice.actions.clearBookState());
  }, [ dispatch ]);

  return (
    <section className={styles.main} data-test-id='main-page'>
      <Menu dataTest='navigation' />
      {
        location.pathname === '/contracts'
          ?
          <Terms contentView='contracts' />
          :
          location.pathname === '/terms'
          ?
          <Terms contentView='terms' />
          :
          (booksLoading || genresLoading) ? null : <ViewPanel />
      }
    </section>
  );
}

