import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IBooks} from '../../../types/IBooks';

export interface BooksState {
  books: IBooks[];
  isLoading: boolean;
  error: string;
  message: string;
}

const initialState: BooksState = {
  books: [],
  isLoading: false,
  error: '',
  message: ''
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    booksFetching(state) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true;
      // eslint-disable-next-line no-param-reassign
      state.message = ''
    },
    booksFetchingSuccess(state, action: PayloadAction<IBooks[]>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.books = action.payload;
    },
    booksFetchingError(state, action: PayloadAction<string>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.message = 'Что-то пошло не так. Обновите страницу через некоторое время.'
    },
    clearError(state) {
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.message = ''
    }
  }
})

export const booksReducer = booksSlice.reducer;
