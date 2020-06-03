/** @jsx jsx */
import { useState, useContext, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import Alert from '../layout/Alert';
import UserContext from '../../context/user/UserContext';
import { loginValidation } from '../../Utilities';
import { navigate } from '@reach/router';

const Login = () => {
  const userContext = useContext(UserContext);
  const { login, isAuthenticated, errors, clearErrors } = userContext;
  const [user, setUser] = useState({ email: '', password: '' });
  const { email, password } = user;
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    let mounted = false;

    if (isAuthenticated) {
      navigate('/');
    }

    if (errors) {
      const flatErrors = errors.message
        ? [errors.message]
        : errors.map((error) => error[Object.keys(error)[0]]);

      setAlerts(flatErrors);
      setTimeout(() => {
        if (mounted) {
          clearErrors();
          setAlerts([]);
        }
      }, 5000);
    }
    return () => {
      mounted = true;
    };
    // eslint-disable-next-line
  }, [isAuthenticated, errors]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = loginValidation(user);
    if (errs.length !== 0) {
      setAlerts(errs);
      setTimeout(() => {
        setAlerts([]);
      }, 5000);
    } else {
      login(user);
    }
  };

  return (
    <div css={styledLogin}>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email :</label>
        <input
          type='email'
          name='email'
          id='email'
          value={email}
          placeholder='Enter your email...'
          onChange={handleChange}
        />
        <label htmlFor='password'>Password :</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          placeholder='Enter your password...'
          onChange={handleChange}
        />
        <button className='btn btn-primary' type='submit'>
          Login
        </button>
      </form>
      {alerts.length !== 0 && <Alert errors={alerts} />}
    </div>
  );
};

const styledLogin = css`
  width: 100%;
  margin: 2rem 0;
  padding: 2rem;
  background-color: #fff;
  form {
    max-width: 500px;
    margin: auto;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr;
    label {
      margin-bottom: 0.2rem;
    }
    input {
      width: 100%;
    }
    input::placeholder {
      font-size: 0.9rem;
    }
  }
  @media (max-width: 500px) {
    margin: 1rem 0;
    padding: 1rem;
  }
`;

export default Login;
