import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { logOut } from '../../store/reducers/auth-slice/auth-actions';

import styles from './menu.module.scss';

import { Menu } from './menu';

interface MenuModalProps {
  setIsShow: any;
  isShow: boolean;
}

const cx = classNames.bind(styles);

export const MenuModal: React.FC<MenuModalProps> = ({setIsShow, isShow}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const modalActive = cx(isShow ? styles.modal__active : styles.modal);

  const closeModal = () => {
     setIsShow(false);
  }

  const logout = () => {
    setIsShow(false);
    dispatch(logOut());
  }

  const redirectToProfile = () => {
    setIsShow(false);
    navigate('/profile')
  }

  return (
    <div
      className={modalActive}
      onClick={setIsShow}
      onKeyPress={setIsShow}
      tabIndex={0}
      role='button'
      data-test-id='burger-navigation'
    >
      <div className={styles.modal__container}>
        <div className={styles.modal__wrapper}>
          <div
            className={styles.modal__wrapper_body}
            onClick={event => event.stopPropagation()}
            onKeyPress={event => event.stopPropagation()}
            tabIndex={0}
            role='button'
          >
            <div className={styles.modal__content}>
              <Menu dataTest='burger' closeModal={closeModal}/>
            </div>
            <hr/>
            <div className={styles.modal__content_links}>
              <div
                tabIndex={0}
                role='button'
                onClick={redirectToProfile}
                onKeyPress={redirectToProfile}
                className={styles.header__menu__link}
              >
                <p>Профиль</p>
              </div>
                <div
                  role='button'
                  tabIndex={0}
                  onKeyPress={() => logout()}
                  onClick={() => logout()}
                  className={styles.exit}
                  data-test-id='exit-button'
                >
                  <p>Выход</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


