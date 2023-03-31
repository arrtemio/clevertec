import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InteractionsState {
  isLoading: boolean;
  error: string;
  status: number | null | undefined;
  message: string;
}

const initialState: InteractionsState = {
  isLoading: false,
  error: '',
  status: null,
  message: ''
}

export const interactionsSlice = createSlice({
  name: 'interactions',
  initialState,
  reducers: {
    clearError(state) {
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.status = null;
      // eslint-disable-next-line no-param-reassign
      state.message = ''
    },
    createReview(state) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.status = null;
      // eslint-disable-next-line no-param-reassign
      state.message = ''
    },
    createReviewSuccess(state) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.status = 200;
      // eslint-disable-next-line no-param-reassign
      state.message = 'Спасибо,что нашли время оценить книгу!';
    },
    createReviewError(state, action: PayloadAction<{message: string, status: number | null | undefined}>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload.message;
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload.status;
      // eslint-disable-next-line no-param-reassign
      state.message = 'Оценка не была отправлена. Попробуйте позже!'
    },
    updateReview(state) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.status = null;
      // eslint-disable-next-line no-param-reassign
      state.message = '';
    },
    updateReviewSuccess(state) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.status = 200;
      // eslint-disable-next-line no-param-reassign
      state.message = 'Спасибо, что нашли время изменить оценку!'
    },
    updateReviewError(state, action: PayloadAction<{message: string, status: number | null | undefined}>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload.message;
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload.status;
      // eslint-disable-next-line no-param-reassign
      state.message = 'Изменения не были сохранены. Попробуйте позже!'
    }
  }
})

export const interactionsReducer = interactionsSlice.reducer;
