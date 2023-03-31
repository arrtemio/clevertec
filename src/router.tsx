import { Navigate } from 'react-router-dom';
import { MainPage } from './pages/main';
import { BookPage } from './pages/book';
import { LoginPage, RegistrationPage, ForgotpassPage } from './pages/auth';
import { Profile } from './pages/profile';

import { IRoute } from './types/IRoute';

export const authRoutes: IRoute[] = [
  {path: '/', element: <Navigate to='/books/all' />},
  {path: '/books/:genre', element: <MainPage />},
  {path: '/books', element: <MainPage />},
  {path: '/books/:genre/:id', element: <BookPage />},
  {path: '/books/:id', element: <BookPage />},
  {path: '/terms', element: <MainPage />},
  {path: '/contracts', element: <MainPage />},
  {path: '/auth', element: <Navigate to='/books/all' />},
  {path: '/registration', element: <Navigate to='/books/all' />},
  {path: '/forgot-pass', element: <Navigate to='/books/all' />},
  {path: '/profile', element: <Profile />}
];

export const privateRoutes: IRoute[] = [
  {path: '/', element: <Navigate to='/auth' />},
  {path: '/auth', element: <LoginPage />},
  {path: '/registration', element: <RegistrationPage />},
  {path: '/forgot-pass', element: <ForgotpassPage />},
  {path: '/', element: <Navigate to='/auth' />},
  {path: '/books/:genre', element: <Navigate to='/auth' />},
  {path: '/books', element: <Navigate to='/auth' />},
  {path: '/books/:genre/:id', element: <Navigate to='/auth' />},
  {path: '/books/:id', element: <Navigate to='/auth' />},
  {path: '/terms', element: <Navigate to='/auth' />},
  {path: '/contracts', element: <Navigate to='/auth' />},
  {path: '/profile', element: <Navigate to='/auth' />}
];
