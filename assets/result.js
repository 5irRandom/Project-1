var videoLink = sessionStorage.getItem("videoLink");
var lyrics = sessionStorage.getItem("lyrics");

console.log(videoLink);
console.log(lyrics);


var videoSpot = document.getElementById('video');
var lyricSpot = document.getElementById('lyrics')

lyricSpot.textContent = lyrics;
videoSpot.setAttribute('src', videoLink);

