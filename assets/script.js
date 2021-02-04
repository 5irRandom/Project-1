// link APIs
// create variables
// create search mechanism
// basic layout, create main and search pages
// search variable has dual purpose (for both lyrics and video)
// check out if youtube has any extra purposes that would be cool
// optional: display previous searches
var lyricsAPI = "https://lyricsovh.docs.apiary.io/#reference";
var searchURL = "https://api.lyrics.ovh/v1/";
var youtubeURL = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyABnDA061k_mkfDbZlLVxHUepez69vgNCE&type=video&q=";
var artist = "";
var title = "";
var searchButton = document.getElementById("search");

function getLyrics(artist, title) {
    fetch(searchURL + artist + "/" + title)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })
}


// Minor WIP but it does work by just inputting a search term, it will then output 5 results to the console and the first one's video link
function getVideo(searchTerm) {
    fetch(youtubeURL + searchTerm)
    .then(response => {
        return response.json()
    })
    .then (data => {
        console.log(data)
        var videoId = data.items[0].id.videoId
        console.log("https://youtu.be/" + videoId)
    })
    .catch(err => {
        console.log("Error: " + err)
    });
}

searchButton.addEventListener("click", function (event) {
    artist = document.getElementById("artistInput").value;
    title = document.getElementById("songInput").value;
    console.log(title);
    getLyrics(artist, title);
    getVideo(title); //Just an example of how we could implement it, it just outputs it to the console for now
})