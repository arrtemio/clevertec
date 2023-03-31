import React, {useState} from 'react';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {getBookCount} from '../../helpers/book-counter';
import {useAppSelector} from '../../hooks/redux';
import { booksSelector, genresSelector } from '../../store/selectors/selectors';

import styles from './menu.module.scss';

import Arrow from '../../static/assets/icons/arrow.svg';
import ArrowFill from '../../static/assets/icons/arrow_fill.svg';

interface MenuProps {
  dataTest: string;
  closeModal?: any;
}

export const Menu: React.FC<MenuProps> = ({dataTest, closeModal}) => {
  const [isGenresShow, setIsGenresShow] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();

  const { genres, error, isLoading } = useAppSelector(genresSelector);
  const { books } = useAppSelector(booksSelector);

  const setActive = ({ isActive }: any) => isActive ? styles.active_link : '';

  const menuSwitcher = () => {
    if (location.pathname.includes('/books')) {
      setIsGenresShow(!isGenresShow);
    } else {
      navigate('/books/all');
    }
  }

  const rulesSwitcher = () => {
    setIsGenresShow(false)
  }

  return (
    <aside className={styles.menu}>
      <div
        className={styles.menu__chapter}
        role='button'
        tabIndex={0}
        onClick={menuSwitcher}
        onKeyPress={menuSwitcher}
        data-test-id={`${dataTest}-showcase`}
      >
        <p>
          <a
            className={
              location.pathname.includes('/books')
                ? styles.active_link
                : undefined
            }
          >
            Витрина книг
          </a>
          { !error ?
            <img
            src={location.pathname.includes('/books') ? ArrowFill : Arrow}
            alt="Arrow"
            className={isGenresShow || error ? styles.arrow : undefined}
          />
          : null
          }
        </p>
      </div>
      <div className={(isGenresShow && !error && !isLoading) ? styles.menu__wrapper : styles.hidden}>
        <ul>
          <li>
            <NavLink
              onClick={dataTest === 'burger' ? () => closeModal(dataTest) : undefined}
              to='/books/all'
              className={setActive}
              data-test-id={`${dataTest}-books`}
            >
              <span className={styles.book_name}>Все книги</span>
            </NavLink>
          </li>
          {genres?.map(genre =>
            <li key={genre.id}>
              <NavLink
                onClick={dataTest === 'burger' ? () => closeModal(dataTest) : undefined}
                className={setActive}
                to={`/books/${genre.path}`

                }>
                <span
                  className={styles.book_name}
                  data-test-id={`${dataTest}-${genre.path}`}
                >
                  {genre.name}
                </span>
                <span
                  className={styles.book_count}
                  data-test-id={`${dataTest}-book-count-for-${genre.path}`}
                >
                  {books && getBookCount(genre, books)}
                </span>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
        <div
          className={styles.menu__chapter}
          role='button'
          onClick={rulesSwitcher}
          onKeyPress={rulesSwitcher}
          tabIndex={0}
          data-test-id={`${dataTest}-terms`}
        >
          <p>
            <NavLink
            className={setActive}
            to='/terms'
            onClick={dataTest === 'burger' ? () => closeModal(dataTest) : undefined}
            >
            Правила пользования
          </NavLink>
          </p>
        </div>
        <div
          className={styles.menu__chapter}
          role='button'
          onClick={rulesSwitcher}
          onKeyPress={rulesSwitcher}
          tabIndex={0}
          data-test-id={`${dataTest}-contract`}
        >
          <p>
            <NavLink
              className={setActive}
              to='/contracts'
              onClick={dataTest === 'burger' ? () => closeModal(dataTest) : undefined}
            >
              Договор оферты
            </NavLink>
          </p>
        </div>
    </aside>
  );
};


