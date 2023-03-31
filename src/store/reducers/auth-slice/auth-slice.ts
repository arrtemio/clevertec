import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../types/IUser';


export interface AuthState {
  isAuth: boolean;
  isLoading: boolean;
  error: string;
  user: IUser;
  status: number | null | undefined;
}

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  error: '',
  user: {
    id: 0,
    username: '',
    firstName: '',
    email: '',
    lastName: '',
    blocked: false,
    confirmed: false,
    createdAt: '',
    phone: '',
    provider: '',
    updatedAt: ''
  },
  status: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true;
    },
    loginSuccess(state, action: PayloadAction<IUser>) {
      // eslint-disable-next-line no-param-reassign
      state.isAuth = true;
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
    },
    loginError(state, action: PayloadAction<string>) {
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
    },
    logout(state) {
      // eslint-disable-next-line no-param-reassign
      state.isAuth = false;
      // eslint-disable-next-line no-param-reassign
      state.user = initialState.user;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
    },
    registration(state) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.status = null;
    },
    registrationSuccess(state) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.status = 200;
    },
    registrationError(state, action: PayloadAction<{message: string, status: number | null | undefined}>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload.message;
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload.status
    },
    forgotPassword(state) {
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true;
      // eslint-disable-next-line no-param-reassign
      state.status = null;
    },
    forgotPasswordSuccess(state) {
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.status = 200;
    },
    forgotPasswordError(state, action: PayloadAction<{message: string, status: number | null | undefined}>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload.message
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload.status
    },
    resetPassword(state) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true;
    },
    resetPasswordSuccess(state) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.status = 200;
    },
    resetPasswordError(state, action: PayloadAction<{message: string, status: number | null | undefined}>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload.message;
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload.status;
    },
    clearError(state) {
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.status = null;
    },
    checkIsAuth(state) {
      // eslint-disable-next-line no-param-reassign
      state.isAuth = true;
    },
    setUser(state, action: PayloadAction<IUser>) {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
    }
  }
})

export const authReducer = authSlice.reducer;
