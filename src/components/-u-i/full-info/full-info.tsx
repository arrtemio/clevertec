import React from 'react';

import styles from './full-info.module.scss';

import {IBook} from '../../../types/IBook';

interface FullInfoProps {
  info: IBook | undefined;
}

export const FullInfo: React.FC<FullInfoProps> = ({ info }) => (
  <div className={styles.wrapper}>
    <table>
      <tbody>
        <tr>
          <td>Издательство</td>
          <td>{info?.publish}</td>
        </tr>
        <tr>
          <td>Год издания</td>
          <td>{info?.issueYear}</td>
        </tr>
        <tr>
          <td>Страниц</td>
          <td>{info?.pages}</td>
        </tr>
        <tr>
          <td>Переплет</td>
          <td>{info?.cover}</td>
        </tr>
        <tr>
          <td>Формат</td>
          <td>{info?.format}</td>
        </tr>
      </tbody>
    </table>
    <table>
      <tbody>
        <tr>
          <td>Жанр</td>
          <td>{info?.categories.join(', ')}</td>
        </tr>
        <tr>
          <td>Вес</td>
          <td>{info?.weight}</td>
        </tr>
        <tr>
          <td>ISBN</td>
          <td>{info?.ISBN}</td>
        </tr>
        <tr>
          <td>Изготовитель</td>
          <td>{info?.producer}</td>
        </tr>
      </tbody>
    </table>
  </div>
);
