import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import {
  booksSelector,
  genresSelector,
  interactionsSelector,
  oneBookSelector, orderSelector, userSelector,
} from '../../store/selectors/selectors';

import { Error } from '../-u-i/error/error';
import { Success } from '../success/success';

export const ServerResponse = () => {
  const {error: booksError, message: booksMessage} = useAppSelector(booksSelector);
  const {error: genresError, message: genresMessage} = useAppSelector(genresSelector);
  const {error: bookError, message: bookMessage} = useAppSelector(oneBookSelector);
  const {error: rateError, message: rateMessage, status: rateStatus} = useAppSelector(interactionsSelector);
  const {error: orderError, message: orderMessage, status: orderStatus} = useAppSelector(orderSelector);
  const {error: userError, message: userMessage, status: userStatus} = useAppSelector(userSelector);

  return (
  <>
    {
      (booksError || genresError || bookError)
      && <Error
        text={booksMessage || genresMessage || bookMessage}
        from={booksError ? 'allBooks' : bookError ? 'oneBook' : 'genres'}
      />
    }
    {rateError && rateStatus !== 200 &&
    <Error text={rateMessage} from='rateBook' />
    }
    {orderError && orderStatus !== 200 &&
    <Error text={orderMessage} from='orderBook' />
    }
    {userError && userStatus !== 200 &&
    <Error text={userMessage} from='user' />
    }
    {rateStatus === 200 &&
    <Success text={rateMessage} from='rateBook' />
    }
    {orderStatus === 200 &&
    <Success text={orderMessage} from='orderBook' />
    }
    {userStatus === 200 &&
    <Success text={userMessage} from='user' />
    }
  </>
  );
};

