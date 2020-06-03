const User = require('../resources/user/user.model');
const jwt = require('jsonwebtoken');
const config = require('config');

const secret = config.get('jwtSecret');

const newToken = (user) => {
  return jwt.sign({ id: user.id }, secret);
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) {
        reject(err);
      }

      resolve(payload);
    });
  });
};

const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({ message: 'Account already exist' });
    }

    user = await User.create({ email, password, name });
    const token = newToken(user);
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const invalid = { message: 'Invalid email and passoword combination' };

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json(invalid);
    }

    const match = await user.checkPassword(password);

    if (!match) {
      return res.status(401).json(invalid);
    }

    const token = newToken(user);
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const token = bearer.split('Bearer ')[1].trim();

  try {
    const payload = await verifyToken(token);
    const user = await User.findById(payload.id).select('-password');
    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = { signup, signin, protect };
