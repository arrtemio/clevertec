import React from 'react';

import styles from './view.module.scss';

export const EmptySearch = () => (
    <div
      className={styles.empty__wrapper}
      data-test-id='search-result-not-found'
    >
      <h3>По запросу ничего не найдено</h3>
    </div>
);

export const EmptyGenre = () => (
  <div
    className={styles.empty__wrapper}
    data-test-id='empty-category'
  >
    <h3>В этой категории книг ещё нет</h3>
  </div>
);


