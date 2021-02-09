// Pulls from sessionStorage
var videoLink = sessionStorage.getItem("videoLink");
var lyrics = sessionStorage.getItem("lyrics");

// Sets variables for the placements
var videoSpot = document.getElementById('video');
var lyricSpot = document.getElementById('lyrics')

// Just in case
console.log(videoLink);
console.log(lyrics);

// Actually attaches the content gotten from sessionStorage
lyricSpot.textContent = lyrics;
videoSpot.setAttribute('src', videoLink);

