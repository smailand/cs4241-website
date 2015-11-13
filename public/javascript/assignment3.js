window.onload = function(){
    var searchText = getURLParam(window.location, "search");
    if(searchText){
        console.log("Search exists");
        document.getElementById("searchText").value = searchText;
        search(searchText)
    }
    else{
        console.log("Search doesn't exist");
        search("");
    }
};

function search(searchText){
    if (!searchText && searchText !=="") {
        searchText = document.getElementById("searchText").value;
        //window.location.pathname="/assignment3?search="+searchText
        //console.log(window.location.pathname);
        var myURL = document.location;
        console.log(document.location.search);
        document.location.search = "?search="+searchText;
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

function addToList(){
    var textToAdd = document.getElementById("textToAdd").value;
    var list = document.getElementById('movieList');
    var newEntry = document.createElement('li');
    newEntry.appendChild(document.createTextNode(textToAdd));
    list.appendChild(newEntry);
}

function removeFromList(){
    var textToRemove = document.getElementById("textToRemove").value;
    var indexToRemove = document.getElementById(textToRemove);
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


function updateList(newListArray){
    var list = document.getElementById('movieList');
    list.innerHTML = "";
    for(var i in newListArray){
        var newEntry = document.createElement('li');
        newEntry.appendChild(document.createTextNode(newListArray[i]));
        list.appendChild(newEntry);
    }
}
