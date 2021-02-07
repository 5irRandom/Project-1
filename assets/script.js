sessionStorage.clear();
var lyricsAPI = "https://lyricsovh.docs.apiary.io/#reference";
var searchURL = "https://api.lyrics.ovh/v1/";
var youtubeURL = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyABnDA061k_mkfDbZlLVxHUepez69vgNCE&type=video&videoEmbeddable=true&q=";
var artist = "";
var title = "";
var searchButton = document.getElementById("search");
var modal = document.getElementById("errorMessage");
var modalSpan = document.getElementsByClassName("close")[0];
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
}


// Minor WIP but it does work by just inputting a search term, it will then first result's video link
// function getVideo(searchTerm) {
//     fetch(youtubeURL + searchTerm)
//     .then(response => {
//         return response.json()
//     })
//     .then (data => {
//         var videoId = data.items[0].id.videoId
//         var videoLink = "https://youtube.com/embed/" + videoId
//         sessionStorage.setItem("videoLink", videoLink)
//         videoDone = true;
//     })
//     .catch(err => {
//         console.log("Error: " + err)
//     });
// }
// Uncomment this when the api lets us through again

searchButton.addEventListener("click", function (event) {
    artist = document.getElementById("artistInput").value;
    title = document.getElementById("songInput").value;
    search = (title + " " + artist);
    getLyrics(artist, title);
    // getVideo(search);
    // Delete lower later
    sessionStorage.setItem("videoLink", "https://youtube.com/embed/UqLRqzTp6Rk");
    videoDone = true;
    // Delete upper later
    // if (videoDone === false && lyricsDone ===true) {


    // }
    setInterval(function () {
        if (videoDone === true && lyricsDone === true) {
            document.location.href = 'results-page.html'
        }

    }, 500);
})


