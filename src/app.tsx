import { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { checkIsAuth } from './store/reducers/auth-slice/auth-actions';
import {
  authSelector, booksSelector, genresSelector,
  interactionsSelector, oneBookSelector, orderSelector, userSelector,
} from './store/selectors/selectors';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchUser } from './store/reducers/user-slice/user-actions';
import { fetchGenres } from './store/reducers/genres-slice/genres-actions';

import { Header } from './components/header';
import { Footer } from './components/footer';
import { MenuModal } from './components/menu/menu-modal';
import { AppRouter } from './app-router';
import { Loader } from './components/-u-i/loader/loader';
import { ServerResponse } from './components/server-response/server-response';

export const App = () => {
  const dispatch = useAppDispatch();
  const [isShow, setIsShow] = useState<boolean>(false);
  const { isAuth } = useAppSelector(authSelector);
  const {isLoading: booksLoading} = useAppSelector(booksSelector);
  const {isLoading: genresLoading} = useAppSelector(genresSelector);
  const {isLoading: bookLoading} = useAppSelector(oneBookSelector);
  const {isLoading: rateLoading} = useAppSelector(interactionsSelector);
  const {isLoading: orderLoading} = useAppSelector(orderSelector);
  const {isLoading: userLoading} = useAppSelector(userSelector);
  const {isLoading: authLoading} = useAppSelector(authSelector);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchGenres());
      dispatch(fetchUser());
    } else {
      dispatch(checkIsAuth());
    }
  }, [dispatch, isAuth]);

  const { body } = document;

  const isLoading: boolean =
    booksLoading || genresLoading || orderLoading || bookLoading || rateLoading || userLoading || authLoading;

  const showHideModal = () => {
    if (isShow) {
      setIsShow(false);
      body.style.overflowY = 'scroll';
    } else {
      setIsShow(true);
      body.style.overflowY = 'hidden';
    }
  }

  return (
    <div className='app'>
      { isLoading && <Loader /> }
      <ServerResponse />
      <HashRouter>
         {isAuth &&
          <div className='header-shadow'>
            <div className='header-wrapper'>
              <Header isShow={isShow} setIsShow={showHideModal}/>
              <MenuModal setIsShow={showHideModal} isShow={isShow} />
            </div>
          </div>
          }
        <AppRouter />
        {isAuth && <Footer/>}
      </HashRouter>
    </div>
  );
};

