const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const path = require('path');
const cors = require("cors");
const busboyCons = require('busboy');

const app = express();
const corsOptions = {
   origin: '*', 
   credentials: true, 
   optionSuccessStatus: 200,
}

app.use(bodyParser.json());
app.use(cors(corsOptions)) 

const ASSET_PATH = '/app/assets/';

app.get('/api/listImages', (req, res) => {
  res.send(getUploadedFiles());
});

const getUploadedFiles = () => {
  let filesOnSystem = [];
  fs.readdirSync('./..' + ASSET_PATH).forEach(file => {
    filesOnSystem.push({src: '/app/assets/'+file});
  });
  return filesOnSystem;
}

app.get('/api/queryImageNames', (req, res) => {
  const query = req.query?.query ?? '';
  let filesOnSystem = getUploadedFiles();
  const pathRegEx = new RegExp(ASSET_PATH, 'g');
  if (query !== "") {
    filesOnSystem = filesOnSystem.filter((name) => {
      name = name.src.replace(pathRegEx, '').split('.')[0].toLowerCase();
      return name.includes(query.toLowerCase());
    });
  }
  res.send(filesOnSystem);
});

app.post('/api/uploadImage', (req, res) => {
  //WRITE FILE TO CDN
  const busboy = busboyCons({ headers: req.headers });
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const saveTo = __dirname + '/..' + ASSET_PATH + filename.filename;
    console.log('Uploading: ' + saveTo);
    file.pipe(fs.createWriteStream(saveTo));
  });
  busboy.on('finish', () => {
    console.log('Upload complete');
    //FETCH LIST OF IMAGE URLS ON CDN AND RETURN IN res
    res.send(getUploadedFiles());
  });
  return req.pipe(busboy);
});

app.listen(3000, () =>
  console.log("API running on http://localhost:3000")
);