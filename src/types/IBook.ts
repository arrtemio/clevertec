export interface IBook {
  id: number;
  title: string;
  rating: number;
  issueYear: string;
  description: string;
  publish: string;
  pages: string;
  cover: string;
  weight: string;
  format: string;
  ISBN: string;
  producer: string;
  authors: string[];
  images: {
    url: string;
  }[];
  categories: string[];
  comments: {
    id: number;
    rating: number;
    text: string;
    createdAt: string;
    user: {
      commentUserId: number;
      firstName: string;
      lastName: string;
      avatarUrl: string;
    }
  }[] | null;
    booking: {
      id: number;
      order: boolean;
      dateOrder: string;
      customerId: number;
      customerFirstName: string;
      customerLastName: string;
    } | null;
    delivery: {
      id: number;
      handed: boolean;
      dateHandedFrom: string;
      dateHandedTo: string;
      recipientId: number;
      recipientFirstName: string;
      recipientLastName: string;
    } | null;
    histories: {
      id: number;
      userId: number
    }[] | null;
}
