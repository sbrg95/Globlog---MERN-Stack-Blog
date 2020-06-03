const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const config = require('config');

cloudinary.config({
  cloud_name: config.get('cloud_name'),
  api_key: config.get('api_key'),
  api_secret: config.get('api_secret'),
});

const upload = multer({ dest: path.resolve(__dirname, 'uploads') });

router.route('/').post(upload.single('upload'), (req, res) => {
  const imagePath = path.resolve(__dirname, 'uploads', req.file.filename);
  cloudinary.uploader.upload(imagePath, function (error, result) {
    if (error) {
      console.error(error);
    }
    res.send(result);
  });
  removeImage(imagePath);
});

const removeImage = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
    }
    console.log('Image removed from server!');
  });
};

module.exports = router;
