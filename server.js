var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var Handlebars = require('handlebars');

var app = express();
var port = process.env.PORT || 3000;

Handlebars.registerHelper('reverseArray', (array) => array.reverse());

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
  var pageTitle = "Home";
  var postId = 0;
  collection.find({ pageTitle: pageTitle, "posts.postId": postId }).toArray(function(err, post) {
    if (err) {
      res.status(500).send({
        error: "Error fetching post from DB"
      });
    } else {
      console.log("== Post:", post);
    }
  });
  var postArray = collection.findOne({ pageTitle: "Home" }, function(err, pageData) {
    if (err) {
      res.status(500).send({
        error: "Error fetching people from DB"
      });
    } else {
      res.status(200).render('homepage', pageData);
    }
  });
});

app.get('/:pageTitle', function (req, res, next) {
  var pageTitle = req.params.pageTitle;
  pageTitle = parsePageTitle(pageTitle);
  var collection = db.collection('postData');
  var postArray = collection.findOne({ pageTitle: pageTitle }, function(err, pageData) {
    if (err) {
      res.status(500).send({
        error: "Error fetching page from DB"
      });
    } else {
      console.log("== pageData:", pageData);
      res.status(200).render('homepage', pageData);
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
    var pageTitle = parsePageTitle(req.params.pageTitle);
    var postId = req.params.postId;
    console.log("== Client added the following reply:");
    console.log("   - pageTitle:", req.params.pageTitle);
    console.log("   - postId:", req.params.postId);
    console.log("   - text:", req.body.text);

    var collection = db.collection('postData');
    var reply = {
      text: req.body.text
    };

    collection.updateOne(
      { pageTitle: pageTitle, "posts.postId": postId },
      { $push: { "posts.$.replies": reply } },
      function (err, result) {
        if (err) {
          res.status(500).send({
            error: "Error inserting reply into DB"
          });
        } else {
          //console.log("== update result:", result);
          if (result.matchedCount > 0) {
            console.log("== success");
            res.status(200).send("Success");
          } else {
            next();
          }
        }
      }
    );

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
