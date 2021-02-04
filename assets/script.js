// link APIs
// create variables
// create search mechanism
// basic layout, create main and search pages
// search variable has dual purpose (for both lyrics and video)
// check out if youtube has any extra purposes that would be cool
// optional: display previous searches
var lyricsAPI = "https://lyricsovh.docs.apiary.io/#reference";
var searchURL = "https://api.lyrics.ovh/v1/";
var artistInput = document.getElementById("artistInput").value;
var songInput = document.getElementById("songInput").value;
var title = "";
var searchButton = document.getElementById("search");

function getLyrics() {
    fetch(searchURL + artist + "/" + title)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })
}

searchButton.addEventListener("click", function (event) {
    artistInput = artist;
    songInput = title;
    getLyrics();
})