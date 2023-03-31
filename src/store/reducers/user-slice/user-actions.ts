import { AppDispatch } from '../../store';
import { userSlice } from './user-slice';
import { UserService } from './user-service';

export const fetchUser = () => async (dispatch: AppDispatch) => {
  try {
   dispatch(userSlice.actions.fetchUser());

   const response =  await UserService.fetchUser();

   dispatch(userSlice.actions.fetchUserSuccess(response.data));
  } catch (e: any) {
    console.log(e.message);
  }
}

export const updateUser =
  (
    userId: number,
    password: string,
    email?: string,
    username?: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
    ) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userSlice.actions.updateUser());

      const response = await UserService.updateUser(userId, password, username, email, phone, firstName, lastName);

      dispatch(userSlice.actions.updateUserSuccess(response.data));
    } catch (e: any) {

      dispatch(userSlice.actions.updateUserError({
        message: e.message,
        status: e.response.status
      }));
    }
  }

  export const changeAvatar = (userId: number, files: FormData) => async (dispatch: AppDispatch) => {
    try {
       dispatch(userSlice.actions.changeAvatar());

      await UserService.uploadFile(files).then((response) => {
        const { id } = response.data[0];
        UserService.changeAvatar(userId, id)
          .then(result => dispatch(userSlice.actions.changeAvatarSuccess(result.data)));
      })
    } catch (e: any) {
      dispatch(userSlice.actions.changeAvatarError({
        message: e.message,
        status: e.response ? e.response.status : 500
      }));
    }
  }
