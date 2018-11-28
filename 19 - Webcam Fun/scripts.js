const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video:true}).then(function(stream){
    (video.srcObject = stream) || (video.src = window.URL.createObjectURL(stream));
    video.play();
    }).catch(err=>{console.log("occured an error", err)})
    
}

function getIntoCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;    
    return setInterval(()=>{
        ctx.drawImage(video, 0, 0, width, height);
        
        //get image data
        let pixels = ctx.getImageData(0, 0, width, height);
        //change the values 
       // pixels = redEffect(pixels);
       // pixels = rgbSplit(pixels); 
        //ctx.globalAlpha = 0.1;
        pixels = greenScreen(pixels); 
        //give back the data
        ctx.putImageData(pixels, 0, 0);
        
    }, 16);
}

function takePhoto(){
    //to play snapsound
    snap.currentTime = 0;
    snap.play();

    //to take photo
    const data = canvas.toDataURL("image/jpeg"); //get the image in jpeg as data
    const link = document.createElement("a"); //create anchor element
    link.href = data; //set href for the link as the data
    link.setAttribute("download", "handsome"); //set the download attribute with value of handsome
    link.innerHTML = `<img src='${link}' alt='handsome snap'/>`; //set the image element
    strip.insertBefore(link, strip.firstChild); //inserting link before the firstchild

}

function redEffect(pixels){
    for(let i=0; i< pixels.data.length; i+=4){
        pixels.data[i] =  pixels.data[i] + 100; //RED
        pixels.data[i+1] = pixels.data[i+1] -50; //Green
        pixels.data[i+2] =  pixels.data[i+2] * 0.5; //Blue
    }
    return pixels;
}
function rgbSplit(pixels){
    for(let i=0; i< pixels.data.length; i+=4){
        pixels.data[i-150] =  pixels.data[i]; //RED
        pixels.data[i+100] = pixels.data[i+1]; //Green
        pixels.data[i-150] =  pixels.data[i+2]; //Blue
    }
    return pixels;
}
function greenScreen(pixels){
    const levels = {};
    //for each slider element associate its value;
    document.querySelectorAll('.rgb input').forEach(element => {
        levels[element.name] = element.value;
    });
    for(let i=0; i< pixels.data.length; i+=4){
        red = pixels.data[i];
        green = pixels.data[i+1];
        blue = pixels.data[i+2];
        alpha = pixels.data[i+3];

        if(red>=levels.rmin && green >= levels.gmin && blue>=levels.bmin
            && red<=levels.rmax && green <= levels.gmax && blue <= levels.bmax){
                pixels.data[i+3] = 0;
            } 
    }
    return pixels;
} 




getVideo();

video.addEventListener("canplay", getIntoCanvas);




