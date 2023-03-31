import React, { useEffect, useState } from 'react';
import MediaQuery from 'react-responsive';
import ReactInputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userSelector } from '../../store/selectors/selectors';
import {
  changeAvatar,
  fetchUser,
  updateUser,
} from '../../store/reducers/user-slice/user-actions';

import styles from './profile.module.scss';

import { RegistrationBody } from '../../types/auth/RegistrationBody';

import Avatar from '../../static/assets/avatar_big.png';
import Checked from '../../static/assets/icons/check.svg';
import EyeOpen from '../../static/assets/icons/eyeOpen.svg';
import EyeClosed from '../../static/assets/icons/eyeClosed.svg';
import Camera from '../../static/assets/icons/camera.svg';
import Background from '../../static/assets/icons/background.svg';

import { EmptyCard } from '../../components/profile/empy-card/empty-card';
import { CardProfile } from '../../components/profile/profile-card/card-profile';
import { BooksHistory } from '../../components/profile/books-history/books-history';

let lettersUser = '';
let numbersUser = '';
let passLength = '';
let upperCasePass = '';
let numberPass = '';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(userSelector);

  const {
    register,
    formState: {errors},
    handleSubmit,
    watch,
    clearErrors
  } = useForm<RegistrationBody>({mode: 'onBlur'});

  const [updateAllowed, setUpdateAllowed] = useState<boolean>(false);
  const [isPassShow, setIsPassShow] = useState<boolean>(false);
  const [userName, setUserName] = useState<boolean>(false);
  const [password, setPassword] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<string>('');
  const [isPhoneValid, setIsPhoneValid] = useState<string>('');

  const watchPass = watch('password');
  const watchUserName = watch('login');
  const watchPhone = watch('phone');

  useEffect(() => {
    dispatch(fetchUser());
  }, [ dispatch ])

  const refreshData = (data: RegistrationBody) => {
    dispatch(updateUser(
      user.id,
      data.password,
      user.username === data.login ? undefined : data.login,
      user.email === data.email ? undefined : data.email,
      user.phone === data.phone ? undefined : data.phone,
      user.firstName === data.firstName ? undefined : data.firstName,
      user.lastName === data.lastName ? undefined : data.lastName
  ));
    dispatch(fetchUser());
    setUpdateAllowed(false);
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.header} data-test-id='profile-avatar'>
        <div className={styles.avatar}>
          <label htmlFor='file-input'>
            <img
              className={styles.avatar__img}
              src={user.avatar ? `https://strapi.cleverland.by${user.avatar}` : Avatar}
              alt='Avatar'
            />
            <div className={styles.avatar__background}>
              <img className={styles.avatar__background_first} src={Background} alt='back' />
              <img className={styles.avatar__background_second} src={Camera} alt='camera' />
            </div>
            <input
              className={styles.file}
              type='file'
              id='file-input'
              onChange={(event => {
                if (event.target.files) {
                  const formData = new FormData();
                  formData.append('files', event.target.files[0]);

                  dispatch(changeAvatar(user.id, formData));
                }
              })}
            />
          </label>
        </div>
        <div>
            <h1>{user.firstName}</h1>
            <h1>{user.lastName}</h1>
        </div>
      </div>
      <div className={styles.data}>
        <h4 className={styles.block__name}>
          Учётные данные
        </h4>
        <p className={styles.block__description}>
          Здесь вы можете отредактировать информацию о себе
        </p>
        <form
          data-test-id='profile-form'
          className={styles.data__form}
          onSubmit={handleSubmit(refreshData)}
        >
          <div className={styles.data__wrapper}>
            <div className={styles.data__wrapper_left}>
              <div className='text-field text-field_floating'>
                <input
                  className={
                    userName || errors.login?.message === 'Поле не может быть пустым'
                      ? 'text-field__input__error'
                      : 'text-field__input'
                  }
                  disabled={!updateAllowed}
                  type='text'
                  id='login'
                  placeholder=' '
                  {...register('login', {
                    value: user.username,
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
                        clearErrors('login');
                      }
                    },
                    onBlur: event => {
                      if (event.target.value) {
                        setUserName(!/^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s)(?!.*[а-яА-ЯёЁ]).*$/i.test(event.target.value));
                      }
                    },
                  })}
                />
                <label className='text-field__label' htmlFor='login'>Логин</label>
              </div>
              <div className={styles.capture__mid}>
                <p className={styles.capture}>
                  { errors.login?.message === 'Поле не может быть пустым'
                    ?
                    <span
                      data-test-id='hint'
                      className={styles.capture__error}
                    >
                      {errors.login.message}
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
                  className='text-field__input'
                  type='text'
                  disabled={!updateAllowed}
                  id='firstName'
                  placeholder=' '
                  {...register('firstName', {
                    value: user.firstName,
                    required: false,
                  })}
                />
                <label className='text-field__label' htmlFor='firstName'>Имя</label>
              </div>
                  <MediaQuery minWidth={586}>
                    <div style={{padding: '18px'}} />
                  </MediaQuery>
                  <MediaQuery maxWidth={585}>
                    <div style={{padding: '15px'}} />
                  </MediaQuery>
              <div className='text-field text-field_floating'>
                <ReactInputMask
                  mask="+375 (99) 999-99-99"
                  maskPlaceholder='+375 (xx) xxx-xx-xx'
                  className={isPhoneValid ? 'text-field__input__error' : 'text-field__input'}
                  placeholder=' '
                  disabled={!updateAllowed}
                  type='text'
                  id='number'
                  {...register('phone', {
                    value: user.phone,
                    required: false,
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
                    },
                    onChange: () => {
                      setIsPhoneValid('');
                    },

                  })}
                />
                <label className='text-field__label' htmlFor='phone'>Номер телефона</label>
              </div>
              { isPhoneValid || watchPhone !== ''
                ?
                <div className={styles.capture__mid}>
                  <p className={styles.capture}>
                      <span
                        data-test-id='hint'
                        className={isPhoneValid ? styles.capture__error : undefined}
                      >
                         {isPhoneValid || watchPhone !== '' && 'В формате +375 (xx) xxx-xx-xx'}
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
            </div>
            <div className={styles.data__wrapper_right}>
              <div className='text-field text-field_floating'>
                <input
                  className={
                    password || errors.password?.message === 'Поле не может быть пустым'
                      ? 'text-field__input__error'
                      : 'text-field__input'
                  }
                  type={isPassShow ? 'text' : 'password'}
                  disabled={!updateAllowed}
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
              <div className={styles.capture__mid}>
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
                  className='text-field__input'
                  type='text'
                  id='lastName'
                  disabled={!updateAllowed}
                  placeholder=' '
                  {...register('lastName', {
                    value: user.lastName,
                    required: false,
                  })}
                />
                <label className='text-field__label' htmlFor='lastName'>Фамилия</label>
              </div>
                  <MediaQuery minWidth={586}>
                    <div style={{padding: '18px'}} />
                  </MediaQuery>
                  <MediaQuery maxWidth={585}>
                    <div style={{padding: '15px'}} />
                  </MediaQuery>

              <div className='text-field text-field_floating'>
                <input
                  className={
                    isEmailValid
                      ? 'text-field__input__error'
                      : 'text-field__input'
                  }
                  type='email'
                  disabled={!updateAllowed}
                  id='email'
                  placeholder=' '
                  {...register('email', {
                    value: user.email,
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
                <div className={styles.capture__mid}>
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
                <div style={{padding: '26px 0'}} />
              }

            </div>
          </div>
          <div className={styles.data__buttons}>
            <button
              data-test-id='edit-button'
              type='button'
              className={`${styles.button} ${styles.button__update}`}
              onClick={() => setUpdateAllowed(!updateAllowed)}
            >
              {updateAllowed ? 'Отменить' : 'Редактировать'}
            </button>
            <button
              data-test-id='save-button'
              type='submit'
              className={`${styles.button} ${styles.button__save}`}
              disabled={!updateAllowed}
            >
              Сохранить изменения
            </button>
          </div>
        </form>
      </div>
      <div className={styles.booked}>
        <h4 className={styles.block__name}>
          Забронированная книга
        </h4>
        <p className={styles.block__description}>
          Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь
        </p>
        {user.booking?.book
          ?
            <CardProfile
              book={user.booking.book}
              profile='booking'
              bookDate={user.booking.dateOrder}
              bookingId={user.booking.id}
            />
          :
            <EmptyCard text='Забронируйте книгу и она отобразится' />
        }
      </div>
      <div className={styles.deliver}>
        <h4 className={styles.block__name}>
          Книга которую взяли
        </h4>
        <p className={styles.block__description}>
          Здесь можете просмотреть информацию о книге и узнать сроки возврата
        </p>
        {user.delivery?.book
          ?
            <CardProfile
              book={user.delivery.book}
              profile='delivery'
              bookDate="2023-03-22T14:46:10.000Z"
            />
          :
            <EmptyCard text='Прочитав книгу, она отобразится в истории' />
        }
      </div>
      <div className={styles.history} data-test-id='history'>
        <h4 className={styles.block__name}>
          История
        </h4>
        <p className={styles.block__description}>
          Список прочитанных книг
        </p>
        {user.history?.books
          ? <BooksHistory books={user.history.books} comments={user.comments}/>
          : <EmptyCard text='Вы не читали книг из нашей библиотеки' />
        }
      </div>
    </section>
  );
};
