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

const superFakeCDNContent = [
  {src: '/app/assets/file_example_GIF_500kB.gif'},
  {src: '/app/assets/raccoon.jpg'},
  {src: '/app/assets/food.jpg'},
  {src: '/app/assets/reef.jpg'},
  {src: '/app/assets/Small_Butterfly.jpg'},
  {src: '/app/assets/Butter.jpeg'},
  {src: '/app/assets/reef2.webp'},
  {src: '/app/assets/dog_on_beach.png'},
];

app.get('/api/listImages', (req, res) => {
  res.send(getUploadedFiles());
});

const getUploadedFiles = () => {
  let filesOnSystem = [];
  fs.readdirSync('./../app/assets').forEach(file => {
    console.log("files:", file);
    filesOnSystem.push({src: '/app/assets/'+file});
  });
  console.log("files on system:", filesOnSystem);
  return filesOnSystem;
}

app.get('/api/queryImageNames', (req, res) => {
  const query = req.query?.query ?? '';
  let filteredNames = [];
  let filesOnSystem = getUploadedFiles();
  if (query !== "") {
    filteredNames = filesOnSystem.filter((name) => {
      return name.src.toLowerCase().includes(query.toLowerCase());
    });
  } else {
    filteredNames = filesOnSystem;
  }
  res.send(filteredNames);
});

app.post('/api/uploadImage', (req, res) => {
  //WRITE FILE TO CDN
  const busboy = busboyCons({ headers: req.headers });
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const saveTo = __dirname + '/../app/assets/' + filename.filename;
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

const saveFile = (url, body) => {
  fs.writeFile(url, body, (err) => {
    if (err) {
      console.log('Error saving');
      throw err;
    } else {
      console.log('It\'s saved!');
    }
  });
}

app.listen(3000, () =>
  console.log("API running on http://localhost:3000")
);