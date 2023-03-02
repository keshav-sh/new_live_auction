const {
        Upload
      } = require("@aws-sdk/lib-storage"),
      {
        S3
      } = require("@aws-sdk/client-s3");
const fs = require('fs');

const Bucket = process.env.AWS_BUCKET_NAME;

const s3 = new S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

// Upload file to S3 bucket
exports.uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket,
    Body: fileStream,
    Key: file.filename,
  };

  // return promise returned by s3
  return new Upload({
    client: s3,
    params: uploadParams
  }).done();
};

// Get file from S3 bucket
exports.getFileStream = async (fileKey) => {
  const downloadParams = {
    Bucket,
    Key: fileKey,
  };
  const file = await s3.getObject(downloadParams);
  return file.Body;
};
