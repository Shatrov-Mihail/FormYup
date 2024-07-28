import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './RegistrationForm.css';

const schema = yup.object().shape({
  email: yup.string()
    .email('Неверный формат почты')
    .max(20, 'Максимум 20 символов')
    .required('Обязательное поле'),
  password: yup.string()
  .max(8, 'Пароль должен содержать максимум 8 символов')
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .required('Обязательное поле'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
	.max(8, 'Пароль должен содержать максимум 8 символов')
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .required('Обязательное поле'),
});

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="registration-form">
      <h2>Регистрация нового пользователя</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            onKeyUp={(e) => {
              if (e.target.value.length >= 20) {
                setFocus('password');
              }
            }}
          />
          {errors.email && <div className="error">{errors.email.message}</div>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Пароль"
            {...register('password')}
            onKeyUp={(e) => {
              if (e.target.value.length >= 8) {
                setFocus('confirmPassword');
              }
            }}
          />
          {errors.password && <div className="error">{errors.password.message}</div>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Повторите пароль"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <div className="error">{errors.confirmPassword.message}</div>
          )}
        </div>
        <button type="submit" disabled={!isValid}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
