import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { authSlice } from '../../store/reducers/auth-slice/auth-slice';
import { authSelector } from '../../store/selectors/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { forgotPassword, resetPassword } from '../../store/reducers/auth-slice/auth-actions';

import styles from './auth.module.scss';

import { Wrapper } from '../../components/auth/wrapper/wrapper';
import { Loader } from '../../components/-u-i/loader/loader';
import { FormWrapper } from '../../components/auth/form-wrapper/form-wrapper';
import { BottomLink } from '../../components/auth/bottom-link/bottom-link';
import { FormWrapperMessage } from '../../components/auth/form-message-wrapper/form-message-wrapper';

import ArrowLeft from '../../static/assets/icons/arrow_left.svg';
import EyeOpen from '../../static/assets/icons/eyeOpen.svg';
import EyeClosed from '../../static/assets/icons/eyeClosed.svg';
import Checked from '../../static/assets/icons/check.svg';

let passLength = '';
let numberPass = '';
let upperCasePass = '';

interface IForgotPassForm {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const ForgotpassPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, status } = useAppSelector(authSelector);
  const [searchParams] = useSearchParams();
  const [isSend, setIsSend] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    clearErrors
  } = useForm<IForgotPassForm>({ mode: 'onBlur' });
  const [isPassShow, setIsPassShow] = useState<boolean>(false);
  const [isPassConfirmedShow, setIsPassConfirmedShow] = useState<boolean>(false);
  const [password, setPassword] = useState<boolean>(false);
  const [emailMessage, setEmailMessage] = useState<string>('');

  useEffect(() => {
    dispatch(authSlice.actions.clearError());
    setIsSend(false);
  }, [dispatch]);

  const code: string = searchParams.get('code') || '';
  const watchPass = watch('password');
  const watchPassConfirmed = watch('passwordConfirmation');


  const onSubmitEmail = ({ email }: IForgotPassForm) => {
    dispatch(authSlice.actions.clearError());
   dispatch(forgotPassword(email));
   setIsSend(true);
  };

  const onSubmitPass = ({ password, passwordConfirmation }: IForgotPassForm) => {
    if (password === passwordConfirmation) {
      dispatch(resetPassword(password, passwordConfirmation, code));
      setIsSend(true);
    }
  }

  const redirectToLogin = () => {
    setIsSend(false);
    navigate('/auth');
    dispatch(authSlice.actions.clearError());
  }

  const backToReset = () => {
    setIsSend(false);
    dispatch(authSlice.actions.clearError());
  }

  return (
    <>
      {isLoading && <Loader />}
      {!code &&
        <Wrapper>
          {isSend && !error
            ?
            <FormWrapperMessage>
              <div className={styles.forgotpass__message} data-test-id='status-block'>
                <h1>Письмо выслано</h1>
                <span>Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля</span>
              </div>
            </FormWrapperMessage>
            :
            <FormWrapper>
              <div className={styles.forgotpass__container}>
                <div className={styles.forgotpass__header}>
                  <Link to='/auth'>
                    <img src={ArrowLeft} alt='Arrow' />
                    <span>ВХОД В ЛИЧНЫЙ КАБИНЕТ</span>
                  </Link>
                </div>
                <h1>Восстановление пароля</h1>
                <form onSubmit={handleSubmit(onSubmitEmail)} data-test-id='send-email-form'>
                  <div className='text-field text-field_floating'>
                    <input
                      className={emailMessage || error ? 'text-field__input__error' : 'text-field__input'}
                      type='text'
                      id='email'
                      placeholder=' '
                      {...register('email', {
                        required: true,
                        pattern: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/i,
                        onChange: () => {
                          clearErrors('email');
                          setEmailMessage('');
                        },
                        onBlur: event => setEmailMessage(
                          event.target.value === ''
                            ? 'Поле не может быть пустым'
                            : /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/i.test(event.target.value)
                              ? ''
                              : 'Введите корректный e-mail'
                        )
                      })}
                    />
                    <label className='text-field__label' htmlFor='email'>Email</label>
                  </div>
                  <div className={styles.capture__mid}>
                    { ( emailMessage || error) &&
                    <p className={styles.capture}>
                        <span
                          data-test-id='hint'
                          className={styles.capture__error}
                        >
                          {emailMessage || 'error'}
                        </span>
                    </p>
                    }
                    <p className={styles.capture}>
                      <span>На это email  будет отправлено письмо с инструкциями по восстановлению пароля</span>
                    </p>
                  </div>
                  <input
                    className={styles.submit}
                    type='submit' value='восстановить'
                    disabled={!!emailMessage}
                  />
                </form>
                <BottomLink text='Нет учетной записи?' to='РЕГИСТРАЦИЯ' path='/registration' />
              </div>
            </FormWrapper>
          }
        </Wrapper>
      }

      {code &&
      <Wrapper>
        {!status
          ?
          <FormWrapper>
            <div className={styles.forgotpass__container_pass}>
              <h1 className={styles.form_name}>Восстановление пароля</h1>
              <form onSubmit={handleSubmit(onSubmitPass)} data-test-id='reset-password-form' >
                <div className='text-field text-field_floating'>
                  <input
                    className={
                      password || errors.password?.message === 'Поле не может быть пустым'
                        ? 'text-field__input__error'
                        : 'text-field__input'
                    }
                    type={isPassShow ? 'text' : 'password'}
                    id='password'
                    placeholder=' '
                    {...register('password', {
                      required: 'Поле не может быть пустым',
                      minLength: {
                        value: 8,
                        message: '8 min'
                      },
                      pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
                        message: 'Incorrect password value'
                      },
                      onChange: event => {
                        const {value} = event.target;

                        if (value) {
                          passLength = value.length >= 8
                            ? ''
                            : 'error'
                          upperCasePass = /^(?=.*[A-Z]).*$/.test(value)
                            ? ''
                            : 'error'
                          numberPass = /^(?=.*\d).*$/.test(value)
                            ? ''
                            : 'error'
                          setPassword(false);
                          clearErrors('password');
                        }
                      },
                      onBlur: event => {
                        const { value } = event.target;

                        setPassword(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(value))
                      }
                    })}
                  />
                  <label className='text-field__label' htmlFor='password'>Пароль</label>
                  {
                    (
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(watchPass) && watchPass.length >= 8
                    ) &&
                    <img className={styles.check} src={Checked} alt='Checked' data-test-id='checkmark'/>
                  }
                  {watchPass ?
                    <button
                      type='button'
                      className={styles.eye_button}
                      onClick={() => setIsPassShow(!isPassShow)}
                    >
                      <img src={isPassShow ? EyeOpen : EyeClosed} alt='EYE' />
                    </button>
                    : undefined
                  }
                </div>
                <div className={styles.capture__big}>
                  <p className={styles.capture}>

                    {errors.password?.message === 'Поле не может быть пустым'
                      ?
                      <span className={styles.capture__error} data-test-id='hint'>
                              {errors.password.message}
                            </span>
                      :
                      <span
                        data-test-id='hint'
                        className={password ? styles.capture__error : undefined}
                      >
                          Пароль
                        <span
                          className={
                            passLength && watchPass !== ''
                              ? styles.capture__error
                              : undefined
                          }
                        > не менее 8 символов
                        </span>,
                        <span className={upperCasePass && watchPass !== '' ? styles.capture__error : undefined}> с заглавной буквой </span>
                        <span className={numberPass && watchPass !== '' ? styles.capture__error : undefined}>и цифрой</span>
                        </span>
                    }
                  </p>
                </div>
                <div className='text-field text-field_floating'>
                  <input
                    className={errors.passwordConfirmation?.message ? 'text-field__input__error' : 'text-field__input'}
                    type={isPassConfirmedShow ? 'text' : 'password'}
                    id='passwordConfirmation'
                    placeholder=' '
                    {...register('passwordConfirmation', {
                      required: 'Поле не может быть пустым',
                      validate: (value: string) => {
                        if (watchPass !== value) {
                          return 'Пароли не совпадают'
                        }

                        return undefined
                      },
                      onChange: () => {
                        clearErrors('passwordConfirmation');
                      }
                    })}
                  />
                  <label className='text-field__label' htmlFor='passwordConfirmation'>Повторите
                    пароль</label>
                  {watchPassConfirmed ?
                    <button
                      type='button'
                      className={styles.eye_button}
                      onClick={() => setIsPassConfirmedShow(!isPassConfirmedShow)}
                      data-test-id={isPassConfirmedShow ? 'eye-opened' : 'eye-closed'}
                    >
                      <img src={isPassConfirmedShow ? EyeOpen : EyeClosed} alt='EYE' />
                    </button>
                    : undefined
                  }
                </div>
                {
                  errors.passwordConfirmation?.message
                    ?
                    <div className={styles.capture__big}>
                      <p className={styles.capture}>
                          <span className={styles.capture__error} data-test-id='hint'>
                          {errors.passwordConfirmation.message}
                        </span>
                      </p>
                      <MediaQuery maxWidth={585}>
                        <div style={{padding: '8px 0'}} />
                      </MediaQuery>
                    </div>
                    :
                    <div className={styles.white_space} />
                }
                <input
                  disabled={!!errors.passwordConfirmation?.message || !!errors.password?.message}
                  className={styles.submit}
                  type='submit'
                  value='сохранить изменения'
                />
                <div className={styles.bottom_text}>После сохранения войдите в библиотеку,
                  используя новый пароль
                </div>
              </form>
            </div>
          </FormWrapper>
          :
          <FormWrapperMessage>
            <div className={styles.forgotpass__message} data-test-id='status-block'>
              <h1>
                {error ? 'Данные не сохранились' : 'Новые данные сохранены'}
              </h1>
              <p className={styles.capture__mid}>
                {error
                  ? 'Что-то пошло не так. Попробуйте ещё раз'
                  : 'Зайдите в личный кабинет, используя свои логин и новый пароль'}
              </p>
              {error
                ?
                <button
                  onClick={backToReset}
                  type='button'
                  className={styles.submit}
                >
                  повторить
                </button>
                :
                <button
                  onClick={redirectToLogin}
                  type='button'
                  className={styles.submit}
                >
                  вход
                </button>
              }
            </div>

          </FormWrapperMessage>
        }
      </Wrapper>
      }
    </>
  )
};
