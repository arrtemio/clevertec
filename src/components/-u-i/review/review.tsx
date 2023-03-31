import React from 'react';
import { getDate } from '../../../helpers/date-transform';

import styles from './review.module.scss';

import { IComment } from '../../../types/IComment';

import Avatar from '../../../static/assets/comment_avatar.png';

import { Rating } from '../rating/rating';

interface ReviewProps {
  comments: IComment[];
}

export const Review: React.FC<ReviewProps> = ({comments}) => {
  const commentsArr = [...comments].reverse();

  return (
    <article data-test-id='reviews'>
      {commentsArr.map(comment =>
        <div
          key={comment.id}
          className={styles.wrapper}
          data-test-id='comment-wrapper'
        >
          <div className={styles.wrapper__user_info}>
            <img
              src={
                comment.user.avatarUrl
                  ? `https://strapi.cleverland.by${comment.user.avatarUrl}`
                  : Avatar
              }
              alt='Avatar'
            />
            <div className={styles.name}>
              <span data-test-id='comment-author'>
                {comment.user.firstName} {comment.user.lastName}
              </span>
              <time data-test-id='comment-date'>
                {getDate(comment.createdAt)}
              </time>
            </div>
          </div>
          <div className={styles.wrapper__rating}>
            <Rating rating={comment.rating} />
          </div>
          {comment.text &&
            <span data-test-id='comment-text'>
              {comment.text}
            </span>
          }
        </div>
      )}
    </article>
  );
}

