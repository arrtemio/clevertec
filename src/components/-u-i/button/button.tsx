import React from 'react';
import classNames from 'classnames/bind';
import styles from './button.module.scss';

const cx = classNames.bind(styles);

interface ButtonProps {
  text: string;
  action?: () => void;
  disabled?: boolean;
  dataTestId?: string;
  isBookHasComment?: boolean;
}

export const Button: React.FC<ButtonProps> =
  ({
     text,
     action,
     disabled = false,
     dataTestId = '',
     isBookHasComment = false,
   }) => (
  <button
    disabled={disabled}
    type="button"
    className={cx('button', { 'button__has': isBookHasComment, 'button__not': !isBookHasComment })}
    onClick={action}
    data-test-id={dataTestId}
  >
    {text}
  </button>
);
