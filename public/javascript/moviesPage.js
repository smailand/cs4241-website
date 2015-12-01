var idIndex = 0;

window.onload = function(){
    var searchText = getURLParam(window.location, "search");
    if(searchText){
        document.getElementById("searchText").value = searchText;
        search(searchText)
    }
    else{
        search("");
    }


};

function searchMovie(e){
    if(e.keyCode == 13){
        search();
    }
}

function addMovie(e){
    if(e.keyCode == 13){
        addToMovieList();
    }
}

function search(searchText){
    if (!searchText && searchText !=="") {
        searchText = document.getElementById("searchText").value;
        html = document.getElementById("content").innerHTML;
        title = document.title;

        window.history.pushState({
            "html": html,
            "pageTitle": title
        }, "", location.origin + location.pathname +  "?search="+searchText)
        //window.location.pathname="/assignment3?search="+searchText
        //console.log(window.location.pathname);
        // var myURL = document.location;
         console.log(document.location);
        // console.log(document.location.search);
        //document.location.search = "?search="+searchText;
    }
    var url = window.location.href;
    var arr = url.split("/");
    var result = arr[0] + "//" + arr[2];
    httpGetAsync(result+'/movieList?searchText='+searchText, function(result){
        resultArray = JSON.parse(result);
        //console.log(resultArray);
        updateList(resultArray);
    });
}



//From https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/search#Examples
function getURLParam (oTarget, sVar) {
  return decodeURI(oTarget.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

function httpGetAsync(url, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            callback(xmlHttp.responseText);
        }
    };
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}

function httpPostAsync(postPath, callback)
{
    var url = window.location.href;
    var arr = url.split("/");
    var result = arr[0] + "//" + arr[2];
    result = result + postPath;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            callback(xmlHttp.responseText);
        }
    };
    xmlHttp.open("POST", result, true); // true for asynchronous
    xmlHttp.send(null);
}


function updateList(newListArray){
    var list = document.getElementById('movieList');
    list.innerHTML = "";
    for(var i in newListArray){
        var newEntry = document.createElement('p');
        newEntry.id="movie"+idIndex;
        idIndex = idIndex + 1;
        newEntry.addEventListener("click", function(){
            removeMovieFromList(this.id);
        });

        newEntry.appendChild(document.createTextNode(newListArray[i]));
        list.appendChild(newEntry);
    }
    var movieToAddInput = document.createElement('input')
    var addButton = document.createElement('button');
}

function addToMovieList(){
    var textToAdd = document.getElementById("movieToAddToList").value;
    var list = document.getElementById('movieList');
    var newEntry = document.createElement('p');
    newEntry.id="movie"+idIndex;
    idIndex = idIndex + 1;
    newEntry.addEventListener("click", function(){
        removeMovieFromList(this.id);
    });
    newEntry.appendChild(document.createTextNode(textToAdd));
    list.appendChild(newEntry);
    document.getElementById("movieToAddToList").value = "";
    httpPostAsync('/addMovie?movieToAdd='+textToAdd, function(result){
        console.log(result);
    });
}

function removeMovieFromList(movieIdToRemove){
    var movieList = document.getElementById("movieList");
    var movieToRemoveId = document.getElementById(movieIdToRemove);
    var movieToRemoveName = document.getElementById(movieIdToRemove).innerHTML;

    var r = confirm("Confirm deletion of " + movieToRemoveName + " from the list?");
    if (r === true) {
        movieList.removeChild(movieToRemoveId);
        httpPostAsync('/removeMovie?movieToRemove='+movieToRemoveName, function(result){
            console.log(result);
        });
    }

}
