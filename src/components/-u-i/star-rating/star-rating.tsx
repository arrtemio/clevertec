import React from 'react';

import styles from './star-rating.module.scss';

import StarEmpty from '../../../static/assets/icons/star_empty.svg';
import StarFull from '../../../static/assets/icons/star_full.svg';

interface StarRatingProps {
  setRating: React.Dispatch<React.SetStateAction<number | null>>;
  rating: number | null;
}

export const StarRating: React.FC<StarRatingProps> = ({setRating, rating}) => (
    <div className={styles.wrapper} data-test-id='rating'>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

         return (
           <label key={ratingValue} data-test-id='star'>
            <input type='radio' name='rating' value={ratingValue} onClick={() => setRating(ratingValue)}/>
            <img
              data-test-id={rating && rating >= ratingValue ? 'star-active' : ''}
              src={(rating && rating >= ratingValue) ? StarFull : StarEmpty}
              alt='Star'
            />
          </label>
        )}
      )}
    </div>
  );

