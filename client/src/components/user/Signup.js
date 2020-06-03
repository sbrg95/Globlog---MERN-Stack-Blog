/** @jsx jsx */
import { useState, useContext, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import Alert from '../layout/Alert';
import UserContext from '../../context/user/UserContext';
import { signupValidation } from '../../Utilities';
import { navigate } from '@reach/router';

const Signup = () => {
  const userContext = useContext(UserContext);
  const { register, isAuthenticated, errors, clearErrors } = userContext;
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = user;
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    let mounted = true;
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
      mounted = false;
    };
    // eslint-disable-next-line
  }, [isAuthenticated, errors]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = signupValidation(user);
    if (errs.length !== 0) {
      setAlerts(errs);
      setTimeout(() => {
        setAlerts([]);
      }, 5000);
    } else {
      register({ name, email, password });
    }
  };
  return (
    <div css={styledSignup}>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          value={name}
          placeholder='Enter your name...'
          onChange={handleChange}
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          value={email}
          placeholder='Enter your email...'
          onChange={handleChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          placeholder='Enter your password...'
          onChange={handleChange}
        />
        <label htmlFor='password2'>Password Again</label>
        <input
          type='password'
          name='password2'
          id='password2'
          value={password2}
          placeholder='Confirm your password...'
          onChange={handleChange}
        />
        <button className='btn btn-primary' type='submit'>
          SignUp
        </button>
      </form>
      {alerts.length !== 0 && <Alert errors={alerts} />}
    </div>
  );
};

const styledSignup = css`
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

export default Signup;
