import { AppDispatch } from '../../store';
import { authSlice } from './auth-slice';
import { AuthService } from './auth-service';
import { IUser } from '../../../types/IUser';

export const login = (identifier: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.login());

    const response = await AuthService.login(identifier, password);

    localStorage.setItem('token', JSON.stringify(response.data.jwt));

    dispatch(authSlice.actions.loginSuccess(response.data.user));
  } catch (e: any) {

    dispatch(authSlice.actions.loginError(e.message));
  }
}

export const registration = (
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phone: string
  ) => async (dispatch: AppDispatch) => {
    try {

      dispatch(authSlice.actions.registration());

      await AuthService.registration(username, email, password, firstName, lastName, phone);

      dispatch(authSlice.actions.registrationSuccess());
    } catch (e: any) {
      dispatch(authSlice.actions.registrationError({
        message: e.message,
        status: e.response.status
      }));
    }
}

export const logOut = () => (dispatch: AppDispatch) => {
  try {

    localStorage.removeItem('token');

    dispatch(authSlice.actions.logout());
  } catch (e: any) {

      console.log(e.message);
  }
}

export const forgotPassword = (email: string) => async (dispatch: AppDispatch) => {
  try {

    dispatch(authSlice.actions.forgotPassword());

    await AuthService.forgotPassword(email);

    dispatch(authSlice.actions.forgotPasswordSuccess());
  } catch (e: any) {

    dispatch(authSlice.actions.forgotPasswordError({
      message: e.message,
      status: e.message === 'Network Error' ? 500 : e.response.status,
    }));
  }
}

export const resetPassword =
  (password: string, passwordConfirmation: string, code: string) =>
    async (dispatch: AppDispatch) => {
    try {

      dispatch(authSlice.actions.resetPassword());

      await AuthService.resetPassword(password, passwordConfirmation, code);

      dispatch(authSlice.actions.resetPasswordSuccess());
    } catch (e: any) {
      dispatch(authSlice.actions.resetPasswordError({
        message: e.message,
        status: e.message === 'Network Error' ? 500 : e.response.status,
      }));
    }
  }

export const checkIsAuth = () => (dispatch: AppDispatch) => {
  try {
    if (localStorage.getItem('token')) {
      dispatch(authSlice.actions.checkIsAuth());
    }
  } catch (e: any) {
    dispatch(authSlice.actions.logout());
  }
}

export const setUser = () => (dispatch: AppDispatch) => {
  try {
    if (localStorage.getItem('user')) {
      const user: IUser = JSON.parse(localStorage.getItem('user') || '{}')
      dispatch(authSlice.actions.setUser(user));
    }
  } catch (e: any) {
      dispatch(authSlice.actions.logout())
  }

}
