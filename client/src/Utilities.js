import axios from 'axios';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['authorization'];
  }
};

export const formatDate = (date) => {
  const month = new Date(date).toLocaleString('default', { month: 'long' });
  const day = new Date(date).getDate();
  const year = new Date(date).getFullYear();
  return `${month} ${day}, ${year}`;
};

export const formatName = (name) => {
  let rawNames = [];
  if (!name.includes(' ')) {
    return `${name[0].toUpperCase()}${name.slice(1, name.length)}`;
  } else {
    rawNames = name.split(' ');
  }

  const formatedNames = rawNames.map(
    (name) => `${name[0].toUpperCase()}${name.slice(1, name.length)}`
  );
  return formatedNames.join(' ');
};

export const postValidation = (post) => {
  const { title, description, body } = post;
  const errors = [];
  if (title === '') {
    errors.push('Post title required');
  }
  if (description === '') {
    errors.push('Post description required');
  }
  if (body === '') {
    errors.push('Post body required');
  }

  return errors;
};

export const loginValidation = (user) => {
  const { email, password } = user;
  const errors = [];
  if (email === '') {
    errors.push('Email required');
  }
  if (password === '') {
    errors.push('Password required');
  }

  return errors;
};

export const signupValidation = (user) => {
  const { name, email, password, password2 } = user;
  const errors = [];
  if (name === '') {
    errors.push('Name required');
  }
  if (email === '') {
    errors.push('Email required');
  }
  if (password === '' || password.length <= 5) {
    errors.push('Password required with at least 5 characters');
  }
  if (password !== password2) {
    errors.push('Passwords must be identical');
  }

  return errors;
};
