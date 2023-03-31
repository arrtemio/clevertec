export interface IPofile {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: Role;
  comments: Comment[];
  avatar: string | null;
  booking: Booking | null;
  delivery: Delivery | null;
  history: History | null;
}

interface Role {
  id: number;
  name: string;
  description: string;
  type: string;
}

export interface Comment {
  id: number;
  rating: number;
  text: string;
  bookId: number;
}

export interface Book {
  id: number;
  title: string;
  rating: number | null;
  issueYear: string;
  authors: string[],
  image: string | null
}

interface Booking {
  id: number;
  order: boolean;
  dateOrder: string;
  book: Book;
}

interface Delivery {
  id: number;
  handed: boolean;
  dateHandedFrom: string;
  dateHandedTo: string;
  book: Book;
}

interface History {
  id: number;
  books : Book[]
}

