const express = require('express');
const connectDB = require('./utils/db');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { signup, signin } = require('./utils/auth');
const {
  signupValidationRules,
  signinValidationRules,
  validate,
} = require('./utils/validator');
const app = express();
connectDB();

app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post('/signup', signupValidationRules(), validate, signup);
app.post('/signin', signinValidationRules(), validate, signin);

app.use('/api/post', require('./resources/post/post.router'));
app.use('/api/user', require('./resources/user/user.router'));
app.use('/api/image', require('./resources/image/image.router'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
