const crudControllers = require('../../utils/crud');
const Post = require('./post.model');

module.exports = crudControllers(Post);
