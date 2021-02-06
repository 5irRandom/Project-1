// link APIs
// create variables
// create search mechanism
// basic layout, create main and search pages
// search variable has dual purpose (for both lyrics and video)
// check out if youtube has any extra purposes that would be cool
// optional: display previous searches
sessionStorage.clear();
var lyricsAPI = "https://lyricsovh.docs.apiary.io/#reference";
var searchURL = "https://api.lyrics.ovh/v1/";
var youtubeURL = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyABnDA061k_mkfDbZlLVxHUepez69vgNCE&type=video&videoEmbeddable=true&q=";
var artist = "";
var title = "";
var searchButton = document.getElementById("search");
var lyricsDone = false;
var videoDone = false;

// Calls the lyrics api and then stores it to sessionStorage
function getLyrics(artist, title) {
    fetch(searchURL + artist + "/" + title)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            sessionStorage.setItem("lyrics", data.lyrics)
            lyricsDone = true;
        })
} console.log(searchURL);
console.log(getLyrics);


// Minor WIP but it does work by just inputting a search term, it will then first result's video link
function getVideo(searchTerm) {
    fetch(youtubeURL + searchTerm)
        .then(response => {
            return response.json()
        })
        .then(data => {
            var videoId = data.items[0].id.videoId
            var videoLink = "https://youtu.be/" + videoId
            sessionStorage.setItem("videoLink", videoLink)
        })
        .catch(err => {
            console.log("Error: " + err)
        });
}

searchButton.addEventListener("click", function (event) {
    artist = document.getElementById("artistInput").value;
    title = document.getElementById("songInput").value;
    search = (title + " " + artist);
    getLyrics(artist, title);
    getVideo(search);

    if (artist === undefined || title === undefined || artist === null || title === null) {
        return;
        var message = document.getElementById("error-message");
        message.setAttribute('style', 'visibility:visible');

        var fixMessage = document.getElementById("error-fix");
        fixMessage.setAttribute('style', 'visibility:visible');
    }

    setInterval(function () {
        if (videoDone === true && lyricsDone === true) {
            document.location.href = 'results-page.html'
        }
    }, 500);
})
