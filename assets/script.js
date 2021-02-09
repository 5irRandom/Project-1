// Setting variables and clearing session storage
sessionStorage.clear();
var lyricsAPI = "https://lyricsovh.docs.apiary.io/#reference";
var searchURL = "https://api.lyrics.ovh/v1/";
var youtubeURL = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyABnDA061k_mkfDbZlLVxHUepez69vgNCE&type=video&videoEmbeddable=true&q=";
var artist = "";
var title = "";
var searchButton = document.getElementById("search");
var clearButton = document.getElementById("clear");
var lyricsDone = false;
var videoDone = false;
var titleString = localStorage.getItem("titleStorage");
var artistString = localStorage.getItem("artistStorage")
if (titleString !== null) {
    var titleStorage = titleString.split(", ");
    var artistStorage = artistString.split(", ");
}
else {
    clearButton.style.display = "none"
}

// Calls the lyrics api and then stores it to sessionStorage
function getLyrics(artist, title) {
    fetch(searchURL + artist + "/" + title)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.lyrics === "") {
                document.getElementById("modal").style.display = "block"
            } else {
                sessionStorage.setItem("lyrics", data.lyrics)
                lyricsDone = true;
            }
        })
}


// Minor WIP but it does work by just inputting a search term, it will then first result's video link
function getVideo(searchTerm) {
    var videoLink = "https://youtube.com/embed/" + "UqLRqzTp6Rk"
    sessionStorage.setItem("videoLink", videoLink)
    videoDone = true;
    // fetch(youtubeURL + searchTerm)
    // .then(response => {
    //     return response.json()
    // })
    // .then (data => {
    //     var videoId = data.items[0].id.videoId
    //     var videoLink = "https://youtube.com/embed/" + videoId
    //     sessionStorage.setItem("videoLink", videoLink)
    //     videoDone = true;
    // })
    // .catch(err => {
    //     console.log("Error: " + err)
    //     document.getElementById("modal").style.display = "block"
    // });
}

// Constant check to see if there is text in the fields, and if there isn't in one then it disables the search button
setInterval(function(){
    if(!$('#artistInput').val() || !$('#songInput').val()) {
        searchButton.classList.add("disabled");
    } else {
        searchButton.classList.remove("disabled");
    }
}, 500);

// This controls the local storage buttons, aka: the search history buttons
function buttonCreate() {
    buttonPlace = document.getElementById("buttonPlace");
    for (i = 1; i < titleStorage.length; i++) {
        console.log(titleStorage[i]);
        console.log(artistStorage[i]);
        var button = document.createElement("button");
        button.textContent = (titleStorage[i] + " " + artistStorage[i]);
        button.classList.add("button");
        button.setAttribute("value", i);
        buttonPlace.appendChild(button);
        button.addEventListener("click", function (event) {
            getLyrics(artistStorage[this.getAttribute('value')], titleStorage[this.getAttribute('value')]);
            getVideo(this.textContent);
            setInterval(function(){
                if (videoDone === true && lyricsDone === true) {
                    document.location.href = 'results-page.html'
                }
            }, 500);
        })
    }
}

// Controls the clear button
clearButton.addEventListener("click", function (event) {
    localStorage.clear();
    location.reload();
})

// A check to see if storage is empty and if it isn't then run the storage button creation code
if (titleString !== null) {
    buttonCreate();
}



// Controls the search button as well as actually running the searches
searchButton.addEventListener("click", function (event) {
    // Quick check to see if the button is disabled
    if (searchButton.classList.contains("disabled")) {

    } else {
        artist = document.getElementById("artistInput").value;
        title = document.getElementById("songInput").value;
        titleString += ", " + title;
        artistString += ", " + artist;
        localStorage.setItem('artistStorage', artistString);
        localStorage.setItem('titleStorage', titleString);
        getLyrics(artist, title);
        getVideo(title + " " + artist);
        setInterval(function(){
            if (videoDone === true && lyricsDone === true) {
                document.location.href = 'results-page.html'
            } 
            
        }, 500);
    }
})
