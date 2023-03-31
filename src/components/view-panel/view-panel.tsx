import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getShortGenre } from '../../helpers/genre-reanslater';
import { useAppSelector } from '../../hooks/redux';
import { booksSelector, genresSelector } from '../../store/selectors/selectors';

import styles from  './view-panel.module.scss';

import { Navigation } from '../-u-i/navigation/navigation';
import { View } from '../-u-i/views/view';
import { EmptyGenre, EmptySearch } from '../-u-i/views/empty-view';

export const ViewPanel = () => {
  const { books } = useAppSelector(booksSelector);
  const { error } = useAppSelector(genresSelector);
  const { genre } = useParams();

  const [isTile, setIsTile] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortByRating, setSortByRating] = useState<boolean>(true);

  const sortedBooks = useMemo(() => {
      if (books && genre) {
        return genre === 'all'
          ? [...books].sort(
            (prev, next) => (
             sortByRating
              ? (next.rating === null ? 0 : next.rating) - (prev.rating === null ? 0 : prev.rating)
              : (prev.rating === null ? 0 : prev.rating) - (next.rating === null ? 0 : next.rating)
            )
          )
          : [...books].filter(book => book.categories.includes(getShortGenre(genre))).sort(
            (prev, next) => (
            sortByRating
              ? (next.rating === null ? 0 : next.rating) - (prev.rating === null ? 0 : prev.rating)
              : (prev.rating === null ? 0 : prev.rating) - (next.rating === null ? 0 : next.rating)
            )
          );
      }

      return [];
  }, [books, genre, sortByRating]);

  const sortedAndSearchedBooks = useMemo(() =>
     sortedBooks.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
  , [sortedBooks, searchQuery ]);


  return (
    <div className={error ? styles.hidden : styles.wrapper}>
      <Navigation
        isTile={isTile}
        setISTile={setIsTile}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortByRating={sortByRating}
        setSortByRating={setSortByRating}
      />
      <View text={searchQuery} isTile={isTile} books={sortedAndSearchedBooks}/>
      {sortedBooks.length === 0 ? <EmptyGenre /> : null}
      {(sortedAndSearchedBooks.length === 0 && sortedBooks.length !== 0) ? <EmptySearch /> : null}
    </div>
  );
};

