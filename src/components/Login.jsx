import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../utils/auth';

const Login = ({ handleLogin }) => {
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
      .login({ email: formValue.email, password: formValue.password })
      .then((request) => {
        if (request.token) {
          localStorage.setItem('token', `${request.token}`);
          setFormValue({ email: '', password: '' });
          navigate('/');
          handleLogin(true);
        }
      })
      .catch(() => {
        handleLogin(false);
      });
  };

  return (
    <div className="login">
      <p className="login__welcome">Вход</p>
      <form onSubmit={handleSubmit} className="login__form">
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
        <div className="login__button-container">
          <button type="submit" className="login__button">
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
