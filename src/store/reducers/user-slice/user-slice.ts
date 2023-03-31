import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IPofile } from '../../../types/IPofile';

export interface UserState {
  isLoading: boolean;
  error: string;
  status: number | null | undefined;
  user: IPofile;
  message: string;
}

const initialState: UserState = {
  isLoading: false,
  error: '',
  status: null,
  message: '',
  user: {
    id: 0,
    username: '',
    email: '',
    confirmed: false,
    blocked: false,
    createdAt: '',
    updatedAt: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: {
      id: 0,
      description: '',
      name: '',
      type: ''
    },
    comments: [],
    avatar: null,
    booking: null,
    delivery: null,
    history: null
  }
}

export const userSlice = createSlice({
  name: 'user',
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
    fetchUser(state) {
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.user = initialState.user;
    },
    fetchUserSuccess(state, action: PayloadAction<IPofile>) {

      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
    },
    updateUser(state) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.status = null;
    },
    updateUserSuccess(state, action: PayloadAction<IPofile>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.status = 200;
      // eslint-disable-next-line no-param-reassign
      state.message = 'Изменения успешно сохранены!'
    },
    updateUserError(state, action: PayloadAction<{message: string, status: number | null | undefined}>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload.message;
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload.status;
      // eslint-disable-next-line no-param-reassign
      state.message = 'Изменения не были сохранены. Попробуйте позже!'
    },
    changeAvatar(state) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.status = null;
      // eslint-disable-next-line no-param-reassign
      state.message = ''
    },
    changeAvatarSuccess(state, action: PayloadAction<IPofile>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.status = 200;
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.message = 'Фото успешно сохранено!';

    },
    changeAvatarError(state, action: PayloadAction<{message: string, status: number | null | undefined}>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload.message;
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload.status;
      // eslint-disable-next-line no-param-reassign
      state.message = 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!'
    },
  }
})

export const userReducer = userSlice.reducer;
