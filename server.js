var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var Handlebars = require('handlebars');

var app = express();
var port = process.env.PORT || 3000;

Handlebars.registerHelper('checklength', function (v1, v2, options) {
'use strict';
  if(v1 != undefined) {
    if (v1.length>v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  }
  return options.inverse(this);
});
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
  collection.findOne({ pageTitle: "Home" }, function(err, pageData) {
    if (err) {
      res.status(500).send({
        error: "Error fetching people from DB"
      });
    } else {
      res.status(200).render('homepage', pageData);
    }
  });
});

app.get('/Favicon.ico', function (req, res, next) {
  res.status(204);
});

app.get('/:pageTitle', function (req, res, next) {
  var pageTitle = req.params.pageTitle;
  pageTitle = parsePageTitle(pageTitle);
  var collection = db.collection('postData');
  collection.findOne({ pageTitle: pageTitle }, function(err, pageData) {
    if (err) {
      res.status(500).send({
        error: "Error fetching page from DB"
      });
    } else {
      res.status(200).render('homepage', pageData);
    }
  });
});

app.post('/:pageTitle/addPost', function(req, res, next) {
  if(req.body && req.body.img && req.body.txt) {
    var pageTitle = req.params.pageTitle;
    pageTitle = parsePageTitle(pageTitle);
    console.log("== Client added the following post:");
    console.log("   - pageTitle:", pageTitle);
    console.log("   - img url:", req.body.img);
    console.log("   - txt:", req.body.txt);

    var collection = db.collection('postData');
    getNextPostId(pageTitle, function(nextPostId) {
      if(nextPostId < 0) {
        res.status(500).send({
          error: "Error inserting post into DB"
        });
      } else {
        var post = {
          postId: nextPostId,
          img: req.body.img,
          txt: req.body.txt,
          replies: []
        }

        collection.updateOne(
          { pageTitle: pageTitle },
          { $push: { posts: post } },
          function (err, result) {
            if (err) {
              res.status(500).send({
                error: "Error inserting post into DB"
              });
            }
          }
        )

        res.status(200).send("Post successfully added");
      }
    });
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
      { pageTitle: pageTitle , "posts.postId": postId },
      { $push: { "posts.$.postId": reply } },
      function (err, result) {
        if (err) {
          res.status(500).send({
            error: "Error inserting reply into DB"
          });
        } else {
          //console.log("== update result:", result);
          console.log("== result.matchedCount:",result.matchedCount);
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

function parsePageTitle(pageTitle) {
  var pageTitle = pageTitle.replace("-", " ");
  var splitStr = pageTitle.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}

function getNextPostId(counterName, callback) {
  var collection = db.collection('counters');
  collection.updateOne(
    { _id: counterName },
    { $inc:{ numPosts:1 } }
  );

  collection.findOne({ _id: counterName }, function(err, data) {
    if (err) {
      callback(-1);
    } else {
      callback(data.numPosts);
    }
  });
}
