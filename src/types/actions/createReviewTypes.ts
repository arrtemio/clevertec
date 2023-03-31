export interface CreateReviewProps {
  rating: number;
  text: string;
  book: string;
  user: string;
}

export interface CreateReviewData {
  data: CreateReviewProps
}
