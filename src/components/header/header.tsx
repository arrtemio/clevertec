import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userSelector } from '../../store/selectors/selectors';
import { logOut } from '../../store/reducers/auth-slice/auth-actions';

import styles from './header.module.scss';
import Logo from '../../static/assets/logo.png';
import Avatar from '../../static/assets/avatar.png';
import Burger from '../../static/assets/icons/burger.svg';
import Close from '../../static/assets/icons/close.svg';

interface HeaderProps {
  isShow: boolean;
  setIsShow: any;
}

export const Header: React.FC<HeaderProps> = ({isShow, setIsShow}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isProfile = useLocation().pathname.includes('profile');

  const { user } = useAppSelector(userSelector);

  return (
    <header className={styles.header}>
      <div className={styles.header__main}>
        <div
          className={styles.header__main_logo}>
          <Link to='/' >
            <img src={Logo} alt='Logo' />
          </Link>
        </div>
        <div className={styles.header__main_burger}>
          <button
            type='button'
            onClick={setIsShow}
            className={styles.burger_button}
            data-test-id='button-burger'
          >
            <img src={isShow ? Close : Burger} alt='Burger Menu' />
          </button>
        </div>
        <h1>
          {isProfile ? 'Личный кабинет' : 'Библиотека'}
        </h1>
      </div>
      <div className={`${styles.header__user_menu} user_menu`} >
        Привет, {user.firstName}!
        <div
          className={styles.header__user_menu_avatar}
        >
          <img
            src={user.avatar ? `https://strapi.cleverland.by${user.avatar}` : Avatar}
            alt='Avatar'/>
          <MediaQuery minWidth={881}>
            <div
              className={styles.header__menu}
            >
              <div className={styles.header__menu__whitespace}/>
              <div className={styles.header__menu__shadow} />
              <div
                tabIndex={0}
                role='button'
                onClick={() => navigate('/profile')}
                onKeyPress={() => navigate('/profile')}
                className={styles.header__menu__link}
                data-test-id='profile-button'
              >
                Профиль
              </div>
              <div
                className={styles.header__menu__link}
                tabIndex={0}
                role='button'
                onClick={() => {
                  dispatch(logOut());
                }}
                onKeyPress={() => {
                  dispatch(logOut());
                }}
              >
                Выход
              </div>
            </div>
          </MediaQuery>
        </div>
      </div>
    </header>
  );
}


