import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';
import MediaQuery from 'react-responsive';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RegistrationBody } from '../../types/auth/RegistrationBody';
import { authSlice } from '../../store/reducers/auth-slice/auth-slice';
import { authSelector } from '../../store/selectors/selectors';

import { Wrapper } from '../../components/auth/wrapper/wrapper';
import { FormWrapper } from '../../components/auth/form-wrapper/form-wrapper';
import { registration } from '../../store/reducers/auth-slice/auth-actions';
import { BottomLink } from '../../components/auth/bottom-link/bottom-link';
import { RegistrationMessage } from '../../components/auth/registration-message/registration-message';

import styles from './auth.module.scss';

import EyeOpen from '../../static/assets/icons/eyeOpen.svg';
import EyeClosed from '../../static/assets/icons/eyeClosed.svg';
import Checked from '../../static/assets/icons/check.svg';

let lettersUser = '';
let numbersUser = '';

let passLength = '';
let upperCasePass = '';
let numberPass = '';

export const RegistrationPage = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(authSelector);

  const [step, setStep] = useState<number>(1);

  const {register, formState: {errors}, handleSubmit, watch, clearErrors} = useForm<RegistrationBody>({mode: 'onBlur'});
  const [isPassShow, setIsPassShow] = useState<boolean>(false);
  const [userName, setUserName] = useState<boolean>(false);
  const [password, setPassword] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<boolean>(false);
  const [lastName, setLastName] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<string>('');
  const [isPhoneValid, setIsPhoneValid] = useState<string>('');
  const [isPhoneEmpty, setIsPhoneEmpty] = useState<string>('');

  const watchPass = watch('password');
  const watchUserName = watch('username');
  const watchPhone = watch('phone');

  useEffect(() => {
    dispatch(authSlice.actions.clearError());
  }, [dispatch]);

  const onSubmit = (data: RegistrationBody) => {
    if (step === 1) {
      setStep(2);
    } else if(step === 2) {
      setStep(3);
    } else {
      dispatch(registration(
        data.username ? data.username : '',
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        data.phone
      ));
    }
  }

  return (
      <Wrapper>
        {!status
          ?
            (
            <FormWrapper>
                <div className={styles.registration_container}>
                  <h1>Регистрация</h1>
                  <span className={styles.steps}>{step} шаг из 3</span>
                  <form onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
                  {step === 1 &&
                  <div className={styles.step}>
                    <div className='text-field text-field_floating'>
                      <input
                        className={
                          userName || errors.username?.message === 'Поле не может быть пустым'
                            ? 'text-field__input__error'
                            : 'text-field__input'
                        }
                        type='text'
                        id='username'
                        placeholder=' '
                        {...register('username', {
                          required: 'Поле не может быть пустым',
                          pattern: {
                            value: /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s)(?!.*[а-яА-ЯёЁ]).*$/i,
                            message: 'Invalid field value'
                          },
                          onChange: event => {
                            const {value} = event.target;

                            if (value) {
                              lettersUser =
                                /^(?=.*[a-zA-Z])(?!.*\s)(?!.*[а-яА-ЯёЁ]).*$/i.test(value)
                                  ? ''
                                  : 'error';
                              numbersUser =
                                /^(?=.*\d).*$/i.test(value) ? '' : 'error';
                              setUserName(false);
                              clearErrors('username');
                            }
                          },
                          onBlur: event => {
                            if (event.target.value) {
                              setUserName(!/^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s)(?!.*[а-яА-ЯёЁ]).*$/i.test(event.target.value));
                            }
                          },
                        })}
                      />
                      <label className='text-field__label' htmlFor='username'>Придумайте логин для входа</label>
                    </div>
                    <div className={styles.capture__low}>
                      <p className={styles.capture}>
                        { errors.username?.message === 'Поле не может быть пустым'
                          ?
                            <span
                              data-test-id='hint'
                              className={styles.capture__error}
                            >
                              {errors.username.message}
                            </span>
                          :
                          <span
                            data-test-id='hint'
                            className={userName ? styles.capture__error : undefined}
                          >
                            Используйте для логина <span
                          className={
                            lettersUser && watchUserName !== ''
                              ? styles.capture__error
                              : undefined
                          }
                        >латинский алфавит
                        </span> и <span className={
                          numbersUser && watchUserName !== ''
                            ? styles.capture__error
                            : undefined
                        }
                        >
                            цифры
                          </span>
                        </span>
                        }
                      </p>
                    </div>
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
                  </div>
                  }

                  {step === 2 &&
                  <div className={styles.step}>
                    <div className='text-field text-field_floating'>
                      <input
                        className={firstName ? 'text-field__input__error' : 'text-field__input'}
                        type='text'
                        id='firstName'
                        placeholder=' '
                        {...register('firstName', {
                          required: true,
                          minLength: {
                            value: 1,
                            message: 'Поле не может быть пустым'
                          },
                          onBlur: event => {
                            setFirstName(event.target.value === '');
                          },
                          onChange: () => {
                            setFirstName(false);
                          }
                        })}
                      />
                      <label className='text-field__label' htmlFor='firstName'>Имя</label>
                    </div>
                    { firstName
                      ?
                      <div className={styles.capture__low}>
                        <p className={styles.capture}>
                          <span
                            data-test-id='hint'
                            className={styles.capture__error}
                          >
                            Поле не может быть пустым
                          </span>
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
                        className={lastName ? 'text-field__input__error' : 'text-field__input'}
                        type='text'
                        id='lastName'
                        placeholder=' '
                        {...register('lastName', {
                          required: true,
                          onBlur: event => {
                            setLastName(event.target.value === '');
                          },
                          onChange: () => {
                            setLastName(false);
                          }

                        })}
                      />
                      <label className='text-field__label' htmlFor='lastName'>Фамилия</label>
                    </div>
                    { lastName
                      ?
                      <div className={styles.capture__big}>
                        <p className={styles.capture}>
                          <span
                            data-test-id='hint'
                            className={styles.capture__error}
                          >
                            Поле не может быть пустым
                          </span>
                          <MediaQuery maxWidth={585}>
                            <div style={{padding: '8px'}} />
                          </MediaQuery>
                        </p>
                      </div>
                      :
                      <div style={{padding: '33px 0'}} />
                    }
                  </div>
                  }

                  {step === 3 &&
                  <div className={styles.step}>
                    <div className='text-field text-field_floating'>
                      <ReactInputMask
                        mask="+375 (99) 999-99-99"
                        maskPlaceholder='+375 (xx) xxx-xx-xx'
                        className={isPhoneValid || isPhoneEmpty ? 'text-field__input__error' : 'text-field__input'}
                        placeholder=' '
                        type='text'
                        id='number'
                        {...register('phone', {
                          required: true,
                          pattern: /^(\+?375)\s.(25|29|33|44|17).\s[\d]{3}(-?[\d]{2}){2}$/,
                          onBlur: (event) => {
                             const { value } = event.target;
                            setIsPhoneValid(
                             value
                               ? /^(\+?375)\s.(25|29|33|44|17).\s[\d]{3}(-?[\d]{2}){2}$/.test(value)
                               ? ''
                               : 'В формате +375 (xx) xxx-xx-xx'
                               : ''

                            );
                            setIsPhoneEmpty(
                              value === ''
                              ? 'Поле не может быть пустым'
                              : ''
                            )
                          },
                          onChange: () => {
                            setIsPhoneValid('');
                            setIsPhoneEmpty('');
                          },

                        })}
                      />
                      <label className='text-field__label' htmlFor='phone'>Номер телефона</label>
                    </div>
                     { isPhoneEmpty || isPhoneValid || watchPhone !== ''
                      ?
                      <div className={styles.capture__low}>
                      <p className={styles.capture}>
                      <span
                        data-test-id='hint'
                        className={isPhoneValid || isPhoneEmpty ? styles.capture__error : undefined}
                      >
                         {isPhoneValid || isPhoneEmpty || watchPhone !== '' && 'В формате +375 (xx) xxx-xx-xx'}
                      </span>
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
                        className={
                          isEmailValid
                            ? 'text-field__input__error'
                            : 'text-field__input'
                        }
                        type='email'
                        id='email'
                        placeholder=' '
                        {...register('email', {
                          required: true,
                          onChange: () => {
                            clearErrors('email');
                            setIsEmailValid('');
                          },
                          pattern: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/i,
                          onBlur: event => {
                            const {value} = event.target;

                              setIsEmailValid(
                                value
                                ?
                                  !/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/i.test(value)
                                  ?
                                    'Введите корректный e-mail'
                                  :
                                    ''
                                :
                                  'Поле не может быть пустым'
                              )
                          },
                        })}
                      />
                      <label className='text-field__label' htmlFor='email'>E-mail</label>
                    </div>
                    {isEmailValid
                      ?
                      <div className={styles.capture__big}>
                      <p className={styles.capture}>
                      <span
                        data-test-id='hint'
                        className={styles.capture__error}
                      >
                        {isEmailValid}
                      </span>
                      </p>
                        <MediaQuery maxWidth={585}>
                          <div style={{padding: '8px'}} />
                        </MediaQuery>
                      </div>
                      :
                      <div style={{padding: '33px 0'}} />
                    }
                  </div>
                  }

                  <input
                    type='submit'
                    className={styles.submit}
                    disabled={
                      !!errors.username?.message || !!errors.password?.message
                      || firstName || lastName
                      || !!isPhoneValid || !!isPhoneEmpty || !!isEmailValid
                    }
                    value={
                      step === 1
                        ? 'следующий шаг'
                        : step === 2
                          ? 'последний шаг'
                          : 'зарегистрироваться'
                    }
                  />
                  <BottomLink text='Есть учётная запись?' to='ВОЙТИ' path='/auth' />
                  </form>
                </div>
            </FormWrapper>
            )
          :
          (
            <RegistrationMessage status={status} setStep={setStep} />
          )
        }
      </Wrapper>
  );
};

