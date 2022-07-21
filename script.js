const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


function toggleplay(){
    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    }
}

function updateButton(){
    const icon = this.paused ?  '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(e){
    let targetButton = e.target;
    video.currentTime += parseFloat(targetButton.dataset.skip);
    console.log(video.currentTime);
}

function rangeHandler(){
    video[this.name] = this.value; 
    console.log(video[this.name]);

}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
  }

setInterval(handleProgress,10);

function scrub(e){
    let scrubTime = (e.offsetX /progress.offsetWidth)*video.duration;
    video.currentTime = scrubTime;

}

video.addEventListener("click",toggleplay);
video.addEventListener("play",updateButton);
video.addEventListener("pause",updateButton);
video.addEventListener("timeupdate",handleProgress)

toggle.addEventListener("click",toggleplay);

skipButtons.forEach(button=>button.addEventListener("click",skip));

ranges.forEach(range=>range.addEventListener("change",rangeHandler));
ranges.forEach(range=>range.addEventListener("mousemove",rangeHandler));

progress.addEventListener("click",scrub);


//Use this to drag the progres sbar smoothly
// let mousedown = false;
// progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
// progress.addEventListener('mousedown', () => mousedown = true);
// progress.addEventListener('mouseup', () => mousedown = false);

