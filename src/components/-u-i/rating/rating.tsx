import React from 'react';

import styles from './rating.module.scss';

import StarFull from '../../../static/assets/icons/star_full.svg';
import StarEmpty from '../../../static/assets/icons/star_empty.svg';

interface RatingProps {
  rating: number | null | undefined;
}

export const Rating: React.FC<RatingProps> = ({rating}) => {

  if (rating !== null && rating !== undefined) {
    return (
      <div data-test-id='rating' className={styles.rating}>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;

          return (
            <img
              className={styles.img}
              key={ratingValue}
              src={rating >= ratingValue ? StarFull : StarEmpty}
              alt='Star'
              data-test-id={rating >= ratingValue ? 'star-active' : ''}
           />
          )}
        )}
      </div>
    )
  }

  return (
    <div data-test-id='rating' className={styles.no_rating}>
        еще нет оценок
    </div>
  );
};


