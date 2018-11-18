
//queryselectors
const video = document.querySelector(".player__video");
const playButton = document.querySelector(".toggle");
const progressFill = document.querySelector(".progress__filled");
const progressBar = document.querySelector(".progress");

const volume = document.querySelector("input[name=volume]");
const playbackRate = document.querySelector("input[name=playbackRate]");
const skipButtons = document.querySelectorAll("button[data-skip]");
const sliders = document.querySelectorAll("input[type='range']")


function togglePlayPause(){
    if(video.paused){
        video.play();
    }else{
        video.pause();      
    }
}

function sliding(e){
    let sliderValue = this.value;
    video[this.name] = sliderValue;
}
//for dragging the vide0 progressbar
function scrolling(e){
    let dragHere = e.offsetX/progressBar.offsetWidth * video.duration;
    video.currentTime = dragHere;
}
//play pause toggle
playButton.addEventListener("click", togglePlayPause);
//play pause button toggle
video.addEventListener("play", ()=> playButton.innerHTML= "►");
video.addEventListener("pause", ()=> playButton.innerText = "II");
//progressbar timeupdate
video.addEventListener("timeupdate", function(){
    let playPosition = video.currentTime / video.duration  * 100 + "%";
    progressFill.style.flexBasis = playPosition;
});
//progress bar click and skip
progressBar.addEventListener("click", scrolling); //brings the pointer to the clickpoint 

//for dragging progress bar while mousedown and mousemove is happening
let mouseDown = false; 
progressBar.addEventListener('mousemove', (e) => mousedown && scrolling(e)); //checks mousedown variable(if its true runs scrolling)
progressBar.addEventListener('mousedown', () => mousedown = true); //when mouse is sets mousedown variable true
progressBar.addEventListener('mouseup', () => mousedown = false); //when mouseup mousedown variable is false

//rewind and forward functions
skipButtons.forEach((e)=> e.addEventListener("click", ()=> video.currentTime+= parseFloat(e.dataset.skip)));
//Sliders
sliders.forEach((e)=> e.addEventListener("change", sliding));
