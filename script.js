
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs=['heyShona','raatanLambiya','tuAkeDekhle','rihaayiDe']
let songIndex=0;
//initially loading songs

loadSongs(songs[songIndex])

function loadSongs(song){
    title.innerText=song;
    audio.src=`music/${song}.mp3`
    cover.src=`images/${song}.jpg`
}
function playSong() {
    musicContainer.classList.add('play');
    //removing the play icon
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    //after removing play pause should be displayed
    playBtn.querySelector('i.fas').classList.add('fa-pause');
  
    audio.play();
  }
function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play');
    
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}
function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1)
    {
        songIndex=0;
    }
    loadSongs(songs[songIndex])
    playSong();
}
function prevSong(){
    songIndex--;

    if(songIndex<0)
    {
        songIndex=songs.length-1;
    }
    loadSongs(songs[songIndex])
    playSong();
}
function updateProgress(e){
  const {duration,currentTime}=e.srcElement
  const progressPercent=(currentTime/duration)*100
  progress.style.width = `${progressPercent}%`;
}
function setProgress(e){
  const width=this.clientWidth
  const clickX=e.offsetX
  const duration=audio.duration
  audio.currentTime=(clickX/width)*duration
}
//event listeners

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
  
    if (isPlaying ) {
      pauseSong();
    } 
    else {
      playSong();
    }
  });

prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)

//for the progess bar to show
audio.addEventListener('timeupdate',updateProgress)

//clicking anywhere in the progress bar

progressContainer.addEventListener('click',setProgress)

audio.addEventListener('ended',nextSong)