var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;
var data = require('./data');
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use(express.static('public'));

app.get('/', function (req, res, next) {
  res.status(200).render('homepage', {
    pageTitle: "Home",
    data: data  //data?
  })
});

app.get('/trending', function (req, res, next) {
  res.status(200).render('homepage', {
    pageTitle: "Trending"
  })
});

app.get('/natural-treasures', function (req, res, next) {
  res.status(200).render('homepage', {
    pageTitle: "Natural Treasures"
  })
});

app.get('/geo-caching', function (req, res, next) {
  res.status(200).render('homepage', {
    pageTitle: "Geo Caching"
  })
});

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
