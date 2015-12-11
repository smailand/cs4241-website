function onLoad(){

}

function search(){
    searchTitle = document.getElementById("textToSearch").value;
    searchTitle = searchTitle.split(' ').join('+');
    httpGetAsync("http://www.omdbapi.com/?t="+searchTitle+"&y=&plot=short&r=json", function(res){
        detailsToGive = document.getElementById("amountOfDetail").value;
        if(JSON.parse(res).Response === 'False'){
            document.getElementById("content").innerHTML += JSON.parse(res).Error;
        }
        else{
            if(detailsToGive == "summary"){
                document.getElementById("content").innerHTML += briefMovie(JSON.parse(res));
            }
            else if(detailsToGive == "someDetail"){
                document.getElementById("content").innerHTML += detailedMovie(JSON.parse(res));
            }
            else if(detailsToGive == "allDetails"){
                document.getElementById("content").innerHTML += fullMoveDetails(JSON.parse(res));
            }
        }
    });
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
