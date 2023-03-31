import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderState {
  isLoading: boolean;
  error: string;
  status: number | null | undefined;
  message: string;
}

const initialState: OrderState = {
  isLoading: false,
  error: '',
  status: null,
  message: ''
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearError(state) {
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.status = null;
      // eslint-disable-next-line no-param-reassign
      state.message = '';
    },
    createOrder(state) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.status = null;
      // eslint-disable-next-line no-param-reassign
      state.message = '';
    },
    createOrderSuccess(state) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.status = 200;
      // eslint-disable-next-line no-param-reassign
      state.message = 'Книга забронирована. Подробности можно посмотреть на странице Профиль';
    },
    createOrderError(state, action: PayloadAction<{message: string, status: number | null | undefined}>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload.message;
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload.status;
      // eslint-disable-next-line no-param-reassign
      state.message = 'Что-то пошло не так, книга не забронирована. Попробуйте позже!'
    },
    updateOrder(state) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.status = null;
      // eslint-disable-next-line no-param-reassign
      state.message = '';
    },
    updateOrderSuccess(state) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.status = 200;
      // eslint-disable-next-line no-param-reassign
      state.message = 'Изменения успешно сохранены!';
    },
    updateOrderError(state, action: PayloadAction<{message: string, status: number | null | undefined}>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload.message;
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload.status;
      // eslint-disable-next-line no-param-reassign
      state.message = 'Изменения не были сохранены. Попробуйте позже!'
    },
    deleteOrder(state) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.status = null;
      // eslint-disable-next-line no-param-reassign
      state.message = '';
    },
    deleteOrderSuccess(state) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.status = 200;
      // eslint-disable-next-line no-param-reassign
      state.message = 'Бронирование книги успешно отменено!';
    },
    deleteOrderError(state, action: PayloadAction<{message: string, status: number | null | undefined}>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload.message;
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload.status;
      // eslint-disable-next-line no-param-reassign
      state.message = 'Не удалось снять бронирование книги. Попробуйте позже!'
    },
  }
})

export const orderReducer = orderSlice.reducer;
