$('.volume-power-container').stop().fadeOut()

const musicContainer = $('.music-container');
const imgContainer = $('.img-container');
const volumePowerContainer = $('.volume-power-container .volume-power');
const volumePowerWidth = $('.volume-power-container .volume-power .power');

const playBtn = $('.playBtn');
const playBtnIcon = $('.playBtn i');
const prevBtn = $('.prev');
const nextBtn = $('.next');

const audio = $('.audio')[0];
audio.volume = .5;
const volume = $('.volume');
const volumeIcon = $('.volume i');
const progress = $('.progress');
const progressContainer = $('.progress-container');
const songTitle = $('.song-title');
const songBand = $('.song-band'); 

//SONG TITLES
const songs = [
  {name:"Priđi malo bliže", group:"Kineski Zid", song:"Priđi Malo Bliže.mp3"},
  {name:"Disko Par", group:"Zorica Milosavljević", song:"Disko Par.mp3"},
  {name:"Lady", group:"Dino Dvornik", song:"Lady.mp3"},
  {name:"Da si me pitao", group:"KIM", song:"Da si me pitao.mp3"}
] 

//KEEP TRACK OF SONG
let songIndex = 0;

//LOAD SONG DETAILS INTO DOM
loadSong(songs[songIndex]);


// UPDATE SONG
function loadSong(song) {
  
  songTitle.html(song.name);
  songBand.html(song.group);
  audio.src = `./mp3/${song.song}`;
}

//PLAY
function playSong() {
   musicContainer.addClass('play');
   imgContainer.addClass('play');
   playBtnIcon.removeClass('fa-play');
   playBtnIcon.addClass('fa-pause'); 

   audio.play();
}

//PAUSE
function pauseSong() {
   musicContainer.removeClass('play');
   imgContainer.removeClass('play');
   playBtnIcon.addClass('fa-play');
   playBtnIcon.removeClass('fa-pause'); 

   audio.pause();
}

//PREVIOUS SONG
function prevSong() {
  const current = $('.currentImg');
  current.removeClass('currentImg');

  songIndex--;

  if(songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);

  const next = $(`.cover-img:nth-of-type(${songIndex+1})`);
  next.addClass('currentImg');

  playSong();
}

//NEXT SONG
function nextSong() {

  const current = $('.currentImg');
  current.removeClass('currentImg');

  songIndex++;

  if(songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);

  const next = $(`.cover-img:nth-of-type(${songIndex+1})`);
  next.addClass('currentImg');
  playSong();
}

//UPDATE PROGRESS BAR
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.width(`${progressPercent}%`);
}

////////////////////////
//EVENT LISTENERS
////////////////////////

playBtn.click( () => {
  const isPlaying = musicContainer.hasClass('play');
  if(isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//CHANGE SONG
nextBtn.click( () => {
  nextSong()
})
prevBtn.click( () => {
  prevSong();
})

//TIME UPDATE
audio.addEventListener( 'timeupdate', updateProgress );
audio.addEventListener( 'ended', nextSong );

//SET TIME
progressContainer.click( (e)=> {
  const width = progressContainer.width();
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
})

function adjustVolume(e) {

  const width = volumePowerContainer.width();
  const clickX = e.offsetX;

  if((clickX / width) > 1) {
    return false;
  } else {

    if(audio.muted = true) {
      audio.muted = false;
      muted = false;
      volumeIcon.removeClass('fa-volume-mute');
    }
    audio.volume = (clickX / width);
    updateVolume();
  }
}

let muted = false;

//MUTE AUDIO
function mute() {

  if(muted == true) {
    audio.muted = false;
    muted = false;
    volumeIcon.removeClass('fa-volume-mute');
  } else {
    muted = true;
    audio.muted = true;
    volumeIcon.addClass('fa-volume-mute');
  }
}

//VOLUME
volume.mouseenter( ()=> {
  $('.volume-power-container').stop().fadeIn()
})
volume.mouseleave( ()=> {
  $('.volume-power-container').stop().fadeOut()
})


volumeIcon.click( ()=> {
  mute()
})

volumePowerContainer.click( (e)=> {
  adjustVolume(e);
})

function updateVolume(e) {

  currentPower = audio.volume;
  setPower = (currentPower / 1) * 100;
  volumePowerWidth.width(`${setPower}%`);
}