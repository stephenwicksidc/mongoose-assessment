const express         = require("express");
const bodyParser      = require("body-parser");
const validator       = require("express-validator");
const mustacheExpress = require("mustache-express");
const path            = require("path");
const routes          = require("./routes/index.js");
const mongoose        = require("mongoose");
const bluebird        = require('bluebird');
const app             = express();

mongoose.connect('mongodb://localhost/27017');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});

app.use(express.static(path.join(__dirname, "public")));

app.engine("mustache", mustacheExpress());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");
app.set("layout", "layout");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());

app.use(routes);

app.listen(3000, function () {
  console.log('This thing is working!')
});

