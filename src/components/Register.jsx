import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import auth from '../utils/auth';

const Register = ({ handleRegister }) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .register({ email: formValue.email, password: formValue.password })
      .then((request) => {
        if (request) {
          setFormValue({ email: '', password: '' });
          navigate('/sign-in');
          handleRegister(true);
        }
      })
      .catch(() => {
        handleRegister(false);
      });
  };

  return (
    <div className="register">
      <p className="register__welcome">Регистрация</p>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          required
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          value={formValue.email}
          onChange={handleChange}
        />
        <input
          required
          id="password"
          name="password"
          type="password"
          minLength={1}
          placeholder="Пароль"
          value={formValue.password}
          onChange={handleChange}
        />
        <div className="register__button-container">
          <button type="submit" className="register__button">
            Зарегистрироваться
          </button>
        </div>
      </form>
      <div className="register__subscription">
        <p>Уже зарегистрированы?</p>
        <Link to="sign-in" className="register__link">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;
