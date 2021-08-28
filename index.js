const express = require("express");
var multer = require("multer");
var cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static("public"));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".glb"); //Appending .jpg
  },
});
var upload = multer({ storage: storage });
// var upload = multer({ dest: __dirname + "/public/" });
var type = upload.single("upl");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/upload", type, function (req, res) {
  console.log(req.body);
  console.log(req.file);
  res.send(req.file);
  // do stuff with file
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
