var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT || 3000;

var fullMovieList = ["Jaws", "Jaws 2", "Jaws 3", "Space Jams", "Big Fish", "The Illusionist"];

app.use(express.static(path.join(__dirname, '/public')));

app.use('/assignment3', function(req, res) {
  res.sendFile(path.join(__dirname, '/views/assignment3.html'));
});




app.get('/movieList', function(req, res){
    var query = req.query;
    var searchQuery = query.searchText;
    var filteredMovieList =[];
    if(searchQuery === ""){
        res.send(fullMovieList);
    }

    else{
        for(var i in fullMovieList){
            if(fullMovieList[i].indexOf(searchQuery) > -1){
                filteredMovieList.push(fullMovieList[i]);
            }
        }
        res.send(filteredMovieList);
    }
});

app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.listen(port, function() {
  console.log('App is listening on port ' + port);
});
