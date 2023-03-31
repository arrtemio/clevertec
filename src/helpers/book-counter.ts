import { IGenre } from "../types/IGenre";
import { IBooks } from "../types/IBooks";

export const getBookCount = (genre: IGenre, books: IBooks[]): number => (
  books?.filter(book => book.categories.includes(genre.name))?.length ?? 0
);
