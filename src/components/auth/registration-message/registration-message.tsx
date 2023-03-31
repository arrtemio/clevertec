import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux';
import { authSlice } from '../../../store/reducers/auth-slice/auth-slice';

import { FormWrapperMessage } from '../form-message-wrapper/form-message-wrapper';

import styles from '../../../pages/auth/auth.module.scss';

interface RegistrationMessageProps {
  status: number;
  setStep: any;
}

export const RegistrationMessage: React.FC<RegistrationMessageProps> = ({status, setStep}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const toLoginPage = () => {
    navigate('/auth');
    dispatch(authSlice.actions.clearError());
  }

  const toRegistration = () => {
    setStep(1);
    dispatch(authSlice.actions.clearError());
  }

  const tryToRegisterAgain = () => {
    setStep(3);
    dispatch(authSlice.actions.clearError());
  }

  return (
    <FormWrapperMessage>
      <div className={styles.registration_message} data-test-id='status-block'>
        <h1>
          {status === 200 ? 'Регистрация успешна' : 'Данные не сохранились'}
        </h1>
        {status === 200 &&
        <p>Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль</p>
        }
        {status === 400 &&
        <p>
          Такой логин или e-mail уже записан в системе.
          Попробуйте зарегистрироваться по другому логину или e-mail.
        </p>
        }
        {(status !== 200 && status !== 400) &&
        <p>
          Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз
        </p>
        }
        {status === 200 &&
        <button
          className={styles.submit}
          type='button'
          onClick={toLoginPage}
        >
          ВХОД
        </button>
        }
        {status === 400 &&
        <button
          className={styles.submit}
          type='button'
          onClick={toRegistration}
        >
          назад к регистрации
        </button>
        }
        {(status !== 200 && status !== 400) &&
        <button
          className={styles.submit}
          type='button'
          onClick={tryToRegisterAgain}
        >
          повторить
        </button>
        }

      </div>
    </FormWrapperMessage>
  );
}
