var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 3000;
var data = require('./data');
data = data.reverse(); // reverse posts array to show the newest post first
for(var i = 0; i < data.length; i++)
{
  data[i].replies.reverse();  // reverse replies array for each post to show the newest reply first
}

//var mongoHost = process.env.MONGO_HOST;
//var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = "group3";//process.env.MONGO_DB_NAME;

const mongoUrl = `mongodb+srv://${mongoUser}:${mongoPassword}@cs290-group3-ujs5i.mongodb.net/${mongoDBName}?retryWrites=true&w=majority`;
var db = null;

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res, next) {
  var collection = db.collection('postData');
  var postArray = collection.find({ pageTitle: "Home" }).toArray(function(err, pageData) {
    if (err) {
      res.status(500).send({
        error: "Error fetching people from DB"
      });
    } else {
      console.log("== pageData:", pageData);
      res.status(200).render('homepage', pageData[0]);
    }
  });
});

app.get('/:pageTitle', function (req, res, next) {
  var pageTitle = req.params.pageTitle;
  pageTitle = parsePageTitle(pageTitle);
  console.log(pageTitle);
  var collection = db.collection('postData');
  var postArray = collection.find({ pageTitle: pageTitle }).toArray(function(err, pageData) {
    if (err) {
      res.status(500).send({
        error: "Error fetching people from DB"
      });
    } else {
      console.log("== pageData:", pageData);
      res.status(200).render('homepage', pageData[0]);
    }
  });
});

function parsePageTitle(pageTitle) {
  var pageTitle = pageTitle.replace("-", " ");
  var splitStr = pageTitle.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}

app.post('/:pageTitle/addPost', function(req, res, next) {
  if(req.body && req.body.img && req.body.txt) {
    console.log("== Client added the following post:");
    console.log("   - pageTitle:", req.params.pageTitle);
    console.log("   - img url:", req.body.img);
    console.log("   - txt:", req.body.img);

    // Add post to DB here

    res.status(200).send("Post successfully added");
  } else {
    res.status(400).send("Requests to this path must contain a JSON body with img and txt fields.");
  }
});

app.post('/:pageTitle/:postId/addReply', function(req, res, next) {
  if(req.body && req.body.text) {
    console.log("== Client added the following reply:");
    console.log("   - pageTitle:", req.params.pageTitle);
    console.log("   - postId:", req.params.postId);
    console.log("   - text:", req.body.text);

    // Add reply to DB here

    res.status(200).send("Reply successfully added");
  } else {
    res.status(400).send("Requests to this path must contain a JSON body with a text field.");
  }
});

app.get('*', function (req, res) {
  res.status(404).render('404');
});

const client = new MongoClient(mongoUrl, { useNewUrlParser: true });
client.connect(function(err, client) {
  if (err) throw err;
  db = client.db(mongoDBName);
  console.log("== MongoDB connected to " + mongoDBName + " database");
  app.listen(port, function () {
    console.log("== Server is listening on port", port);
  });
});
