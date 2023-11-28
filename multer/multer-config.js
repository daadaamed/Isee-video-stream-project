/** @format */

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './client/public/uploads/posts');
  },
  filename: (req, file, callback) => {
    let fileName;
    if (file.fieldname === 'picture') {
      fileName = req.body.posterId + Date.now() + '.jpg';
    } else if (file.fieldname === 'link') {
      fileName = req.body.posterId + Date.now() + '.mp4';
    }
    callback(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
