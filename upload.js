const request = require('request');
const fs = require('fs');
const { join } = require('path');

function upload(fileName, url) {
  if (!fileName) {
    throw new Error(`missing file name argument.`);
  }

  const options = {
    method: 'POST',
    url,
    headers: {
      'Content-Type':
        'multipart/form-data; boundary=--------------------------506966054074300324908361',
    },
    formData: {
      sampleFile: {
        value: fs.createReadStream(`./${fileName}`),
        options: {
          filename: fileName,
          contentType: null,
        },
      },
    },
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
}

const path = process.argv[2];
const url =
  process.argv[3] ||
  process.env.UPLOAD_URL ||
  'http://ab794664.ngrok.io/upload';

if (url && path && fs.existsSync(path)) {
  if (fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).map((fileName) => upload(join(path, fileName), url));
  } else {
    upload(path, url);
  }
}

module.exports = upload;
