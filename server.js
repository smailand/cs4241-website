var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public/CSS')));

app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});


app.listen(port, function() {
  console.log('App is listening on port ' + port);
});
