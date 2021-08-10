const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();
app.use(fileUpload());

const { join } = require("path");
const fs = require("fs");
const path = join(__dirname, "files");

if (!fs.existsSync(path)) {
  fs.mkdir(path, () => console.log(`path directory created @ ${path}`));
}

app.post("/upload", function(req, res) {
  console.log(`upload called`);
  console.log(req.files);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  const filePath = join(path, sampleFile.name);

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(filePath, function(err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
});

app.listen(9999, () => {
  console.log(`running app on 9999`);
});
