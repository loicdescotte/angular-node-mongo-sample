var express = require('express');
var http = require('http');
var path = require('path');

var easymongo = require('easymongo');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var mongo = new easymongo({dbname: 'test'});
var collection = mongo.collection('postits');

///routes

//find all
app.get('/postit', function(req, res) {
  collection.find(function(error, results) {
  	res.send(results)
   })
});

//create
app.post('/postit', function(req, res) {
  collection.save(req.body, function(error, results) {
    res.send(req.body)
  })
});

//update
app.post('/postit/:id', function(req, res) {
  collection.update({_id: req.params.id}, req.body, function(error, results) {
    res.send(req.body)
  })
});

//update
app.delete('/postit/:id', function(req, res) {
  console.log(req.params)
  collection.remove({_id: req.params.id}, req.body, function(error, results) {
  	res.send('Postit deleted')
  })
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


