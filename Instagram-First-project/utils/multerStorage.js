const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createMulterStorage = (uploadPath) => {
  const storage = multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      }
  });

  return multer({ 
      storage: storage,
      fileFilter: (req, file, cb) => {
          const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
          if (allowedTypes.includes(file.mimetype)) {
              cb(null, true);
          } else {
              cb(new Error('Invalid file type'), false);
          }
      }
  });
};

module.exports = createMulterStorage