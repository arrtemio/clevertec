import { $auth } from '../../../http';
import {AppDispatch} from '../../store';
import {IBooks} from '../../../types/IBooks';
import {booksSlice} from './books-slice';

export const fetchAllBooks = () => async (dispatch: AppDispatch) =>  {
  try {
      dispatch(booksSlice.actions.booksFetching());

      const response = await $auth.get<IBooks[]>('/books');

      dispatch(booksSlice.actions.booksFetchingSuccess(response.data));
  } catch (e: any) {
      dispatch(booksSlice.actions.booksFetchingError(e.message));
  }
}
