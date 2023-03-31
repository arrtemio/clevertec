import { CombinedState } from '@reduxjs/toolkit';
import { AuthState } from '../reducers/auth-slice/auth-slice';
import { BooksState } from '../reducers/books-slice/books-slice';
import { GenresState } from '../reducers/genres-slice/genres-slice';
import { OneBookState } from '../reducers/book-slice/onebook-slice';
import { InteractionsState } from '../reducers/interactions-slice/interactions-slice';
import { OrderState } from '../reducers/order-slice/order-slice';
import { UserState } from '../reducers/user-slice/user-slice';

export const authSelector =
  ((state: CombinedState<{ authReducer: AuthState}>) => state.authReducer);

export const booksSelector =
  ((state: CombinedState<{ booksReducer: BooksState}>) => state.booksReducer);

export const genresSelector =
  ((state: CombinedState<{ genresReducer: GenresState}>) => state.genresReducer);

export const oneBookSelector =
  ((state: CombinedState<{ oneBookReducer: OneBookState}>) => state.oneBookReducer);

export const interactionsSelector =
  ((state: CombinedState<{ interactionsReducer: InteractionsState}>) => state.interactionsReducer);

export const orderSelector =
  ((state: CombinedState<{ orderReducer: OrderState}>) => state.orderReducer);

export const userSelector =
  ((state: CombinedState<{ userReducer: UserState}>) => state.userReducer);

