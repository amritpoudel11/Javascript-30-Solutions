let countDown;
const display = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const button = document.querySelectorAll('.timer__button');

function timer(seconds){
    clearInterval(countDown);
    const now = Date.now();
    const then = now + seconds*1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countDown = setInterval(()=>{
    const secondsLeft = Math.round((then - Date.now())/1000);
        if(secondsLeft < 0){
            clearInterval(countDown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainingSecs = seconds % 60;
    const displayProp = `${minutes}:${remainingSecs<10? '0' : ''}${remainingSecs}`;
    document.title = displayProp;
    display.textContent = displayProp;
}
function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hour>12 ? hour -12: hour}:${minutes<10? '0':''}${minutes}`;
}
function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

button.forEach(element => {
    element.addEventListener("click", startTimer);
});
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins*60);
    this.reset();
});

