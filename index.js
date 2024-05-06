let trackList = [
  {
    name: "Broke For Free",
    artist: "Anonymous",
    image: "https://picsum.photos/640/360",
    path: "songs/sample1.mp3",
  },
  {
    name: "Every Morning",
    artist: "Anton Vlasov",
    image: "https://picsum.photos/320/180",
    path: "songs/every-morning-18304.mp3",
  },
  {
    name: "Relax and Sleep",
    artist: "Anton Vlasov",
    image: "https://picsum.photos/480/270",
    path: "songs/relax-and-sleep-18565.mp3",
  },
  {
    name: "Uplifting Day",
    artist: "Lesfm",
    image: "https://picsum.photos/240/180",
    path: "songs/uplifting-day-15583.mp3",
  },
];

//selecting dom elements

const nowPlaying = document.querySelector(".now-playing");
const trackArt = document.querySelector(".track-art");
const trackName = document.querySelector(".track-name");
const trackArtist = document.querySelector(".track-artist");

const prevBtn = document.querySelector(".prev-track");
const nextBtn = document.querySelector(".next-track");
const playPauseBtn = document.querySelector(".playpause-track");

const seekSlider = document.querySelector(".seek_slider");
const volumeSlider = document.querySelector(".volume_slider");
const currentTime = document.querySelector(".current-time");
const totalDuration = document.querySelector(".total-duration");

// creating some global variables.
let trackIndex = 0;
let isSongPlaying = false;
let intervalID;

//create an audio element.
const audioPlayer = document.createElement("audio");

// to load a track.
function loadTrack() {
  if (intervalID) {
    clearInterval(intervalID); //stop the UI updates for the previous song.
  }

  const track = trackList[trackIndex];
  audioPlayer.src = trackList[trackIndex].path;
  audioPlayer.load();
  // audioPlayer.play();

  nowPlaying.innerText = `Playing ${trackIndex + 1} of ${trackList.length}`;
  trackArt.style.backgroundImage = `url("${track.image}")`;
  trackName.innerText = track.name;
  trackArtist.innerText = track.artist;

  // set UI as such each sec update of the track played can be seen on the screen.

  intervalID = setInterval(seekUpdate, 1000);
  random_bg_color();
}

// setup a randome background color when switching between songs.
function random_bg_color() {
  let red = Math.floor(Math.random() * (256 - 64)) + 64;
  let green = Math.floor(Math.random() * (256 - 64)) + 64;
  let blue = Math.floor(Math.random() * (256 - 64)) + 64;

  let color = `rgb( ${red}, ${green}, ${blue} )`;
  document.body.style.backgroundColor = color;
}

// play or pause a track

function playOrPause() {
  if (isSongPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function playTrack() {
  audioPlayer.play();
  isSongPlaying = true;
  playPauseBtn.querySelector("span").classList.remove("fa-play-circle");
  playPauseBtn.querySelector("span").classList.add("fa-pause-circle");
}

function pauseTrack() {
  audioPlayer.pause();
  isSongPlaying = false;
  playPauseBtn.querySelector("span").classList.remove("fa-pause-circle");
  playPauseBtn.querySelector("span").classList.add("fa-play-circle");
}

function previousTrack() {
  trackIndex = trackIndex - 1;

  if (trackIndex < 0) {
    trackIndex = trackList.length - 1;
  }

  loadTrack();
  playTrack();
}

function nextTrack() {
  trackIndex = trackIndex + 1;

  if (trackIndex === trackList.length) {
    trackIndex = 0;
  }

  loadTrack();
  playTrack();
}

function setVolume() {
  audioPlayer.volume = volumeSlider.value / 100;
}

function seekTo() {
  audioPlayer.currentTime = (seekSlider.value / 100) * audioPlayer.duration;
}

// update the time of the track played each sec on the slider
function seekUpdate() {
  const timeSongPlayed = audioPlayer.currentTime; //how much the song is played in sec.
  const songDuration = audioPlayer.duration;
  // totalDuration.innerHTML = totalDurationinMinutes;

  // value setting for slider to make it move
  seekSlider.value = Math.floor((timeSongPlayed / songDuration) * 100);

  //value in sec for song played and total dusration of the song.
  const currentTimeinMinutes = Math.floor(timeSongPlayed / 60);
  const currentTimeinSec = Math.floor(
    timeSongPlayed - currentTimeinMinutes * 60
  );

  currentTime.innerText = `${("" + currentTimeinMinutes).padStart(2, "0")}: ${(
    "" + currentTimeinSec
  ).padStart(2, "0")}`;

  //total duration
  const totalDurationInMin = Math.floor(songDuration / 60);
  const totalDurationInSec = Math.floor(songDuration - totalDurationInMin * 60);

  totalDuration.innerText = `${("" + totalDurationInMin).padStart(
    2,
    "0"
  )} :  ${("" + totalDurationInSec).padStart(2, "0")}`;
}

loadTrack();

playPauseBtn.addEventListener("click", playOrPause);
seekSlider.addEventListener("input", seekTo);
prevBtn.addEventListener("click", previousTrack);
nextBtn.addEventListener("click", nextTrack);
volumeSlider.addEventListener("input", setVolume);
