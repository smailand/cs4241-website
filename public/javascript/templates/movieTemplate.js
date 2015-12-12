var briefMovie = _.template(
    "<div class='movie'>" +
    "<div id='info'>" +
    "<h1><%= Title %></h1>"+
    "<a href="+"http://www.imdb.com/title/"+"<%= imdbID %>"+"/?ref_=fn_al_tt_1"+"  target=\"_blank\">IMDb Page</a>"+
    "<h3>Release Date: <%= Released %></h3>"+
    "<h4>Rated: <%= Rated %></h4>"+
    "<h4>Director: <%= Director %></h4>"+
    "</div>" +
    "</div>"
);


var detailedMovie = _.template(
    "<div class='movie'>" +
    "<div id='info'>" +
    "<h1><%= Title %></h1>"+
    "<a href="+"http://www.imdb.com/title/"+"<%= imdbID %>"+"/?ref_=fn_al_tt_1"+"  target=\"_blank\">IMDb Page</a>"+
    "<h3>Release Date: <%= Released %></h3>"+
    "<h4>Rated: <%= Rated %></h4>"+
    "<h4>Director: <%= Director %></h4>"+
    "<h4>Head Writer: <%= Writer %></h4>"+
    "<h4>Actors: <%= Actors %></h4>"+
    "<p><%= Plot %>"+
    "</div>" +
    "</div>"
);


var fullMoveDetails = _.template(
    "<div class='movie'>" +
    "<div id='info'>" +
    "<h1><%= Title %></h1>"+
    "<a href="+"http://www.imdb.com/title/"+"<%= imdbID %>"+"/?ref_=fn_al_tt_1"+"  target=\"_blank\">IMDb Page</a>"+
    "<h3>Release Date: <%= Released %></h3>"+
    "<h4>Rated: <%= Rated %></h4>"+
    "<h4>Director: <%= Director %></h4>"+
    "<h4>Head Writer: <%= Writer %></h4>"+
    "<h4>Actors: <%= Actors %></h4>"+
    "<p>Runtime: <%= Runtime %><p>"+
    "<p>Genre: <%= Genre %><p>"+
    "<p>Language: <%= Language %><p>"+
    "<p>Awards: <%= Awards %><p>"+
    "<p><%= Plot %><p>"+
    "</br>" +
    "<p>IMDb Rating: <%= imdbRating %>/10 with <%= imdbVotes %> votes cast<p>"+
    "</div>" +
    "</div>"
);
