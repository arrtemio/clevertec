import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { authSlice } from '../../store/reducers/auth-slice/auth-slice';
import { authSelector } from '../../store/selectors/selectors';
import { login } from '../../store/reducers/auth-slice/auth-actions';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { Wrapper } from '../../components/auth/wrapper/wrapper';
import { FormWrapper } from '../../components/auth/form-wrapper/form-wrapper';
import { FormWrapperMessage } from '../../components/auth/form-message-wrapper/form-message-wrapper';
import { BottomLink } from '../../components/auth/bottom-link/bottom-link';

import styles from './auth.module.scss';

import EyeClosed from '../../static/assets/icons/eyeClosed.svg';
import EyeOpen from '../../static/assets/icons/eyeOpen.svg';

interface ILoginForm {
  identifier: string;
  password: string;
}

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(authSelector);
  const {register, formState: {errors}, handleSubmit, watch} = useForm<ILoginForm>({mode: 'all'});
  const [isPassShow, setIsPassShow] = useState<boolean>(false);

  useEffect(() => {
    dispatch(authSlice.actions.clearError());
  }, [ dispatch ])

  const watchPass = watch('password');

  const onSubmit = (data: ILoginForm) => {
    dispatch(login(data.identifier, data.password));
  }

  const retry = () => {
    dispatch(authSlice.actions.clearError());
  }

  return (
      <Wrapper>
       {(error === 'Request failed with status code 400' || !error) &&
        <FormWrapper>
          <h1 className={styles.form_name}>Вход в личный кабинет</h1>
          <form className={styles.login_container} onSubmit={handleSubmit(onSubmit)} data-test-id='auth-form'>
              <div className='text-field text-field_floating'>
                <input
                  className={error || errors.identifier?.message ? 'text-field__input__error' : 'text-field__input'}
                  type='text'
                  id='identifier'
                  data-test-id='input'
                  placeholder=' '
                  {...register('identifier', {
                    required: 'Поле не может быть пустым',
                  })}
                />
                <label className='text-field__label' htmlFor='identifier'>Логин</label>
              </div>
            { errors.identifier?.message
              ?
              <div className={styles.capture__low}>
                <p className={styles.capture}>
                  <span className={styles.capture__error} data-test-id='hint'>Поле не может быть пустым</span>
                </p>
                <MediaQuery maxWidth={585}>
                  <div style={{padding: '2px'}} />
                </MediaQuery>
              </div>
              :
              <>
                <MediaQuery minWidth={586}>
                  <div style={{padding: '17px'}} />
                </MediaQuery>
                <MediaQuery maxWidth={585}>
                  <div style={{padding: '15px'}} />
                </MediaQuery>
              </>
            }
              <div className='text-field text-field_floating'>
                <input
                  className={error || errors.password?.message ? 'text-field__input__error' : 'text-field__input'}
                  type={isPassShow ? 'text' : 'password'}
                  data-test-id='pass-input'
                  id='password'
                  placeholder=' '
                  {...register('password', {required: 'Поле не может быть пустым'})}
                />
                <label className='text-field__label' htmlFor='password'>Пароль</label>
                {watchPass ?
                  <button
                    type='button'
                    className={styles.eye_button}
                    onClick={() => setIsPassShow(!isPassShow)}
                    data-test-id={isPassShow ? 'eye-opened' : 'eye-closed'}
                  >
                    <img src={isPassShow ? EyeOpen : EyeClosed} alt='EYE' />
                  </button>
                  : undefined
                }
              </div>
            { errors.password?.message &&
              <div>
                <p className={styles.capture}>
                  <span className={styles.capture__error} data-test-id='hint'>Поле не может быть пустым</span>
                </p>
              </div>
            }
            {!error &&
                <Link to='/forgot-pass' className={styles.forgot}>Забыли логин или пароль?</Link>
              }
              {error === 'Request failed with status code 400'  &&
              <div className={styles.login_container__error}>
                <p data-test-id='hint'>Неверный логин или пароль!</p>
                <p><Link to='/forgot-pass' className={styles.forgot__reset}>Восстановить?</Link></p>
              </div>
              }
              <button className={styles.submit} type='submit'>вход</button>
          </form>
          <BottomLink text='Нет учетной записи?' to='РЕГИСТРАЦИЯ' path='/registration' />
        </FormWrapper>
       }
        {(error && error !== 'Request failed with status code 400') &&
          <FormWrapperMessage>
            <div className={styles.login__message} data-test-id='status-block'>
              <h1>Вход не выполнен</h1>
              <p>Что-то пошло не так. Попробуйте ещё раз</p>
              <button
                className={styles.submit}
                type='button'
                onClick={retry}
              >
                повторить
              </button>
            </div>
          </FormWrapperMessage>
        }
      </Wrapper>
  );
}

