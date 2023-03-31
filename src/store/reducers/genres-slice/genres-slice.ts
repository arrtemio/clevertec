import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IGenre} from '../../../types/IGenre';

export interface GenresState {
  genres: IGenre[];
  isLoading: boolean;
  error: string;
  message: string;
}

const initialState: GenresState = {
  genres: [],
  isLoading: false,
  error: '',
  message: ''
}

export const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    genresFetching(state) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true;
      // eslint-disable-next-line no-param-reassign
      state.message = ''
    },
    genresFetchingSuccess(state, action: PayloadAction<IGenre[]>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.genres = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
    },
    genresFetchingError(state, action: PayloadAction<string>) {
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
      state.message = '';
    }
  }
})

export const genresReducer = genresSlice.reducer;
