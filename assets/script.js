sessionStorage.clear();
var lyricsAPI = "https://lyricsovh.docs.apiary.io/#reference";
var searchURL = "https://api.lyrics.ovh/v1/";
var youtubeURL = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyABnDA061k_mkfDbZlLVxHUepez69vgNCE&type=video&videoEmbeddable=true&q=";
var artist = "";
var title = "";
var searchButton = document.getElementById("search");
var lyricsDone = false;
var videoDone = false;
var storageString = "";
storageString = localStorage.getItem('storage');
if (storageString !== null) {
    var buttonsStrings = storageString.split(", ");
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
    fetch(youtubeURL + searchTerm)
    .then(response => {
        return response.json()
    })
    .then (data => {
        var videoId = data.items[0].id.videoId
        var videoLink = "https://youtube.com/embed/" + videoId
        sessionStorage.setItem("videoLink", videoLink)
        videoDone = true;
    })
    .catch(err => {
        console.log("Error: " + err)
        document.getElementById("modal").style.display = "block"
    });
}

setInterval(function(){
    if(!$('#artistInput').val() || !$('#songInput').val()) {
        searchButton.classList.add("disabled");
    } else {
        searchButton.classList.remove("disabled");
    }
}, 500);

function buttonCreate() {
    buttonPlace = document.getElementById("buttonPlace");
    for (i = 1; i < buttonsStrings.length; i++) {
        var button = document.createElement("button");
        button.textContent = buttonsStrings[i];
        button.classList.add("button");
        buttonPlace.appendChild(button);
        button.addEventListener("click", function (event) {
            console.log(this.textContent)
            var split = this.textContent.split(" ");
            getLyrics(split[1], split[0]);
            getVideo(this.textContent);
            setInterval(function(){
                if (videoDone === true && lyricsDone === true) {
                    document.location.href = 'results-page.html'
                }
            }, 500);
        })
    }
    var clearButton = document.createElement("button");
    clearButton.textContent = "Clear";
    clearButton.setAttribute('class', 'button alert');
    buttonPlace.appendChild(clearButton);
    clearButton.addEventListener("click", function (event) {
        localStorage.clear();
        location.reload();
    })
}

if (storageString !== null) {
buttonCreate();
}

searchButton.addEventListener("click", function (event) {
    if (searchButton.classList.contains("disabled")) {

    } else {
        artist = document.getElementById("artistInput").value;
        title = document.getElementById("songInput").value;
        search = (title + " " + artist);
        storageString += ", " + search;
        localStorage.setItem('storage', storageString);
        getLyrics(artist, title);
        getVideo(search);
        setInterval(function(){
            if (videoDone === true && lyricsDone === true) {
                document.location.href = 'results-page.html'
            } 
            
        }, 500);
    }
})
