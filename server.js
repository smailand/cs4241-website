var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();
var port = process.env.PORT || 3000;

// var fullMovieList = ["Jaws", "Jaws 2", "Jaws 3", "Space Jams", "Big Fish", "The Illusionist"];


// var fileStream = fs.createWriteStream(path.join(__dirname, "public/movies.txt"));
// fileStream.write(JSON.stringify(fullMovieList));

app.use(express.static(path.join(__dirname, '/public')));

app.use('/assignment3', function(req, res) {
  res.sendFile(path.join(__dirname, '/views/assignment3.html'));
});


function readMoviesFile(){
    fullMovieList = fs.readFileSync(path.join(__dirname, "public/movies.txt"));
    fullMovieList = JSON.parse(fullMovieList);
}

function writeMoviesFile(){
    var fileStream = fs.createWriteStream(path.join(__dirname, "public/movies.txt"));
    fileStream.write(JSON.stringify(fullMovieList));
}




app.get('/movieList', function(req, res){
    readMoviesFile();
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

app.post("/addMovie", function(req, res){
    var query = req.query;
    var movieToAdd = query.movieToAdd;
    fullMovieList.push(movieToAdd);
    writeMoviesFile();
    res.send("Added "+ movieToAdd);
});

app.post("/removeMovie", function(req, res){
    var query = req.query;
    var movieToRemove = query.movieToRemove;
    for (var i=fullMovieList.length-1; i>=0; i--) {
        if (fullMovieList[i] === movieToRemove) {
            fullMovieList.splice(i, 1);
        }
    }
    writeMoviesFile();
    res.send("Removed " + movieToRemove);

});


app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.listen(port, function() {
  console.log('App is listening on port ' + port);
});
