import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { booksReducer } from './reducers/books-slice/books-slice';
import { genresReducer } from './reducers/genres-slice/genres-slice';
import { oneBookReducer } from './reducers/book-slice/onebook-slice';
import { authReducer } from './reducers/auth-slice/auth-slice';
import { interactionsReducer } from './reducers/interactions-slice/interactions-slice';
import { orderReducer } from './reducers/order-slice/order-slice';
import { userReducer } from './reducers/user-slice/user-slice';

const rootReducer = combineReducers({
  booksReducer,
  genresReducer,
  oneBookReducer,
  authReducer,
  interactionsReducer,
  orderReducer,
  userReducer
})

export const setupStore = () => configureStore({
   reducer: rootReducer,
 });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
