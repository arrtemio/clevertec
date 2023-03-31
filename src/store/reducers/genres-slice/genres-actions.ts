import { $auth } from '../../../http';
import {AppDispatch} from '../../store';
import {genresSlice} from './genres-slice';
import {IGenre} from '../../../types/IGenre';

export const fetchGenres = () => async (dispatch: AppDispatch) => {
  try {
      dispatch(genresSlice.actions.genresFetching());

      const response = await $auth.get<IGenre[]>('/categories');

      dispatch(genresSlice.actions.genresFetchingSuccess(response.data));
  } catch (e: any) {
      dispatch(genresSlice.actions.genresFetchingError(e.message));
  }
}
