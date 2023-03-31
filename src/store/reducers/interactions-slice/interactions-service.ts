import { AxiosResponse } from 'axios';
import { $auth } from '../../../http';
import { CreateReviewData } from '../../../types/actions/createReviewTypes';

export class InteractionsService {
  static async createReview(data: CreateReviewData): Promise<AxiosResponse> {
    return $auth.post('/comments', data);
  }

  static async updateReview(commentId: string, data: CreateReviewData): Promise<AxiosResponse> {
    return $auth.put(`/comments/${commentId}`, data);
  }
}
