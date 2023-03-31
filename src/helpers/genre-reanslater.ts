export const getGenre = (str: string) => (
  str === 'all' ? 'Все книги'
    : str === 'business' ? 'Бизнес книги'
    : str === 'psychology' ? 'Книги по психологии'
    : str === 'parents' ? 'Книги для родителей'
    : str === 'non-fiction' ? 'Нон-фикшн'
    : str === 'fiction' ? 'Художественная литература'
    : str === 'programming' ? 'Книги по программированию'
    : str === 'hobby' ? 'Хобби'
    : str === 'design' ? 'Книги по дизайну'
    : str === 'childish' ? 'Книги для детей'
    : 'Другое'
);

export const getShortGenre = (str: string) => (
  str === 'all' ? 'Все книги'
    : str === 'business' ? 'Бизнес'
    : str === 'psychology' ? 'Психология'
    : str === 'parents' ? 'Родителям'
    : str === 'non-fiction' ? 'Нон-фикшн'
    : str === 'fiction' ? 'Художественная литература'
    : str === 'programming' ? 'Программирование'
    : str === 'hobby' ? 'Хобби'
    : str === 'design' ? 'Дизайн'
    : str === 'childish' ? 'Детские'
    : 'Другое'
);
