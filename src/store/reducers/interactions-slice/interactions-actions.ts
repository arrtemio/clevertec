import { AppDispatch } from '../../store';
import { interactionsSlice } from './interactions-slice';
import { InteractionsService } from './interactions-service';
import { CreateReviewData } from '../../../types/actions/createReviewTypes'

export const createReview = (
  data: CreateReviewData
) => async (dispatch: AppDispatch) => {
  try {
    dispatch(interactionsSlice.actions.createReview());

    await InteractionsService.createReview(data);

    dispatch(interactionsSlice.actions.createReviewSuccess());

  } catch (e: any) {

    dispatch(interactionsSlice.actions.createReviewError({
      message: e.message,
      status: e.response.status
    }));
  }
}

export const updateReview =
  (commentId: string, data: CreateReviewData) => async (dispatch: AppDispatch) => {

  try {
    dispatch(interactionsSlice.actions.updateReview());

    await InteractionsService.updateReview(commentId, data);

    dispatch(interactionsSlice.actions.updateReviewSuccess())
  } catch (e: any) {

    dispatch(interactionsSlice.actions.createReviewError({
      message: e.message,
      status: e.response.status
    }));
  }
}
