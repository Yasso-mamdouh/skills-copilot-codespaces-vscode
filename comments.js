// Create Web Server
// Create Web Server
var express = require('express');
var server = express();

// Create Database
var Datastore = require('nedb');
var db = new Datastore({ filename: 'comments.db', autoload: true });

// CORS
var cors = require('cors');
server.use(cors());

// Body Parser
var bodyParser = require('body-parser');
server.use(bodyParser.json());

// Create Web Server
server.listen(3000, function() {
  console.log('Server listening on port 3000!');
});

// Create Comment
server.post('/comments', function(req, res) {
  console.log('POST /comments');
  console.log('BODY: ' + JSON.stringify(req.body));

  // Insert Comment
  db.insert(req.body, function(err, comment) {
    if (err) {
      console.log('Error: ' + err);
      res.sendStatus(500);
    } else {
      console.log('Document inserted into database: ' + JSON.stringify(comment));
      res.sendStatus(200);
    }
  });
});

// Read Comments
server.get('/comments', function(req, res) {
  console.log('GET /comments');

  // Find All Comments
  db.find({}, function(err, comments) {
    if (err) {
      console.log('Error: ' + err);
      res.sendStatus(500);
    } else {
      console.log('Found documents: ' + JSON.stringify(comments));
      res.send(comments);
    }
  });
});

// Update Comment
server.put('/comments/:id', function(req, res) {
  console.log('PUT /comments/:id');
  console.log('BODY: ' + JSON.stringify(req.body));

  // Update Comment
  db.update({ _id: req.params.id }, req.body, {}, function(err, numReplaced) {
    if (err) {
      console.log('Error: ' + err);
      res.sendStatus(500);
    } else {
      console.log('Number of documents replaced: ' + numReplaced);
      res.sendStatus(200);
    }
  });
});

// Delete Comment
server.delete('/comments/:id', function(req, res) {
  console.log('DELETE /comments/:id');

  // Delete Comment
  db.remove({ _id: req.params.id }, {}, function(err, numRemoved) {
    if (err) {
      console.log('Error: ' + err);
      res.sendStatus(500);
    } else {
      console.log('Number of documents removed: ' + numRemoved);
      res.sendStatus(200);
    }