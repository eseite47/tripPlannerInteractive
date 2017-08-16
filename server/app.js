const express = require ('express')
const app = express();
const volleyball = require ('volleyball');
const bodyParser = require ('body-parser');
const path = require ('path')
const apiRouter = require('./routes/api').router

var db = require("./models").db;

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(volleyball)

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api', apiRouter)

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  res.send("Something Went Wrong" + err.message);
});

var port = 3000;
app.listen(port, function() {
  console.log("The server is listening closely on port", port);
  db
    .sync()
    .then(function() {
      console.log("Synchronated the database");
    })
    .catch(function(err) {
      console.error("Trouble right here in River City", err, err.stack);
    });
});
