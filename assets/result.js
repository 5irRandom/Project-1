var videoLink = sessionStorage.getItem("videoLink");
var lyrics = sessionStorage.getItem("lyrics");

console.log(videoLink);
console.log(lyrics);

var videoDiv = document.getElementById("video");
var lyricsDiv = document.getElementById("lyrics");

videoDiv.append(videoLink);
lyricsDiv.append(lyrics);