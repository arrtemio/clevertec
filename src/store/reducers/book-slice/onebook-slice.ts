import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IBook} from '../../../types/IBook';

export interface OneBookState {
  book: IBook | null;
  isLoading: boolean;
  error: string;
  message: string;
}

const initialState: OneBookState = {
  book: null,
  isLoading: false,
  error: '',
  message: ''
}

export const oneBookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    fetchOneBook(state) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.message = '';
    },
    fetchOneBookSuccess(state, action: PayloadAction<IBook>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.book = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
    },
    fetchOneBookError(state, action: PayloadAction<string>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.message = 'Что-то пошло не так. Обновите страницу через некоторое время.';
    },
    clearBookState(state) {
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.book = null;
      // eslint-disable-next-line no-param-reassign
      state.message = '';
    }
  }
})

export const oneBookReducer = oneBookSlice.reducer;
