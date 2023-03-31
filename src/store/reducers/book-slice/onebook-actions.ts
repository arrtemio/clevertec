import { $auth } from '../../../http';
import {AppDispatch} from '../../store';
import {oneBookSlice} from './onebook-slice';
import {IBook} from '../../../types/IBook';

export const fetchOneBook = (id: number) => async (dispatch: AppDispatch) => {
  try {

    dispatch(oneBookSlice.actions.fetchOneBook());

    const response = await $auth.get<IBook>(`/books/${id}`);

    dispatch(oneBookSlice.actions.fetchOneBookSuccess(response.data));
  } catch (e: any) {
      dispatch(oneBookSlice.actions.fetchOneBookError(e.message));
  }
}
