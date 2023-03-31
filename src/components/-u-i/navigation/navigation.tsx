import React, {useState} from 'react';
import MediaQuery from 'react-responsive';

import styles from './navigation.module.scss';
import Search from '../../../static/assets/icons/search.svg';
import Sort from '../../../static/assets/icons/sort.svg';
import Close from '../../../static/assets/icons/close.svg';

interface NavigationProps {
  isTile: boolean;
  setISTile:  React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  sortByRating: boolean;
  setSortByRating: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navigation: React.FC<NavigationProps> = (
  { isTile,
    setISTile,
    searchQuery,
    setSearchQuery,
    sortByRating,
    setSortByRating
  }
) => {
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  return (
    <nav className={styles.nav}>
      <MediaQuery minWidth={586}>
        <div className={styles.nav__left}>
          <div className={styles.nav__search}>
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              type='text'
              placeholder='Поиск книги или автора…'
              data-test-id='input-search'
            />
            <button type='button'>
              <img src={Search} alt='Search'/>
            </button>
          </div>
          <div className={styles.nav__sort}>
            <button
              type='button'
              onClick={() => setSortByRating(!sortByRating)}
              data-test-id='sort-rating-button'
            >
              <img
                className={sortByRating ? null : styles.reverse}
                src={Sort}
                alt='Sort'/>
              <span>По рейтингу</span>
            </button>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={585}>
        <div className={!isSearchActive ? styles.nav__left_mob : styles.hidden}>
          <button
            type='button'
            data-test-id='button-search-open'
            onClick={() => setIsSearchActive(true)}
          >
            <img src={Search} alt='Search'/>
          </button>
          <button
            type='button'
            onClick={() => setSortByRating(!sortByRating)}
            data-test-id='sort-rating-button'
          >
            <img
              className={sortByRating ? null : styles.reverse}
              src={Sort}
              alt='Sort'/>
          </button>
        </div>
        <div className={isSearchActive ? styles.nav__active_search : styles.hidden}>
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            type="text"
            placeholder='Поиск книги или автора...'
            data-test-id='input-search'
          />
          <button
            type='button'
            onClick={() => setIsSearchActive(false)}
            data-test-id='button-search-close'
          >
            <img src={Close} alt="Close"/>
          </button>
        </div>
      </MediaQuery>
        <div className={styles.nav__view}>
        <button
          className={isTile ? styles.button_active : undefined}
          data-test-id='button-menu-view-window'
          type='button'
          onClick={() => setISTile(true)}
        >
          <svg width='15' height='15' viewBox='0 0 15 15' fill='none'
               xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M1.14773 0.5C0.789997 0.5 0.5 0.789997 0.5 1.14773V6.32955C0.5 6.68728 0.789997 6.97727 1.14773 6.97727H6.32955C6.68728 6.97727 6.97727 6.68728 6.97727 6.32955V1.14773C6.97727 0.789997 6.68728 0.5 6.32955 0.5H1.14773ZM1.79545 5.68182V1.79545H5.68182V5.68182H1.79545ZM8.92045 0.5C8.56273 0.5 8.27273 0.789997 8.27273 1.14773V6.32955C8.27273 6.68728 8.56273 6.97727 8.92045 6.97727H14.1023C14.46 6.97727 14.75 6.68728 14.75 6.32955V1.14773C14.75 0.789997 14.46 0.5 14.1023 0.5H8.92045ZM9.56818 5.68182V1.79545H13.4545V5.68182H9.56818ZM0.5 8.92045C0.5 8.56273 0.789997 8.27273 1.14773 8.27273H6.32955C6.68728 8.27273 6.97727 8.56273 6.97727 8.92045V14.1023C6.97727 14.46 6.68728 14.75 6.32955 14.75H1.14773C0.789997 14.75 0.5 14.46 0.5 14.1023V8.92045ZM1.79545 9.56818V13.4545H5.68182V9.56818H1.79545ZM8.92045 8.27273C8.56273 8.27273 8.27273 8.56273 8.27273 8.92045V14.1023C8.27273 14.46 8.56273 14.75 8.92045 14.75H14.1023C14.46 14.75 14.75 14.46 14.75 14.1023V8.92045C14.75 8.56273 14.46 8.27273 14.1023 8.27273H8.92045ZM9.56818 13.4545V9.56818H13.4545V13.4545H9.56818Z'
              fill='#A7A7A7'
            />
          </svg>
        </button>
        <button
          className={!isTile ? styles.button_active : undefined}
          data-test-id='button-menu-view-list'
          type='button'
          onClick={() => setISTile(false)}
        >
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none'
               xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M2.0835 10C2.0835 9.56282 2.43794 9.20837 2.87516 9.20837H17.1252C17.5624 9.20837 17.9168 9.56282 17.9168 10C17.9168 10.4373 17.5624 10.7917 17.1252 10.7917H2.87516C2.43794 10.7917 2.0835 10.4373 2.0835 10Z'
              fill='#A7A7A7'
            />
            <path
              d='M2.0835 5.25004C2.0835 4.81282 2.43794 4.45837 2.87516 4.45837H17.1252C17.5624 4.45837 17.9168 4.81282 17.9168 5.25004C17.9168 5.68727 17.5624 6.04171 17.1252 6.04171H2.87516C2.43794 6.04171 2.0835 5.68727 2.0835 5.25004Z'
              fill='#A7A7A7'
            />
            <path
              d='M2.0835 14.75C2.0835 14.3128 2.43794 13.9584 2.87516 13.9584H17.1252C17.5624 13.9584 17.9168 14.3128 17.9168 14.75C17.9168 15.1873 17.5624 15.5417 17.1252 15.5417H2.87516C2.43794 15.5417 2.0835 15.1873 2.0835 14.75Z'
              fill='#A7A7A7'
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
