const express = require("express");
var multer = require("multer");
var cors = require("cors");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = "./public/";
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //Appending .jpg
  },
});
var upload = multer({ storage: storage });
// var upload = multer({ dest: __dirname + "/public/" });
var type = upload.single("upl");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/upload", type, function (req, res) {
  res.send(req.file);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
