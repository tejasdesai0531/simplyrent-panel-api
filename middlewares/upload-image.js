const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');


// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-south-1'
});

const s3 = new AWS.S3();

// Configure Multer middleware to handle file uploads
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      cb(null, `images/${Date.now().toString()}.${ext}`);
    },
  }),
});

module.exports = upload;