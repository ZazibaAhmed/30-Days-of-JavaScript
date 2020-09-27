// Get our elements
const player=document.querySelector('.player');
const video=player.querySelector('.viewer');
const progress=player.querySelector('.progress');
const progressBar=player.querySelector('.progress__filled');
const toggle=player.querySelector('.toggle');
const skipButtons=player.querySelectorAll('[data-skip]');
const ranges=player.querySelectorAll('.player__slider');
const fsButton=player.querySelector('.fs__button');


// Build our functions

function togglePlay(){
	if(video.paused){
		video.play();
	}
	else{
		video.pause();
	}
}

function updatButton(){
	toggle.textContent = this.paused  ? '►' : '❚ ❚'
}

function changeVolume(){
	video.volume=this.value;
}

function changeSpeed(){
	video.playbackRate=this.value;
}

function skip(){
	//console.log(this.dataset.skip);
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleProgress(){
	let percent=(video.currentTime/video.duration) * 100;
	progressBar.style.flexBasis=`${percent}%`;
}

function scrub(e){
	let scrubTime=(e.offsetX/progress.offsetWidth)*video.duration;
	video.currentTime = scrubTime;
}

function fullScreen(){
	video.requestFullscreen();
}



// Hook up event listeners
video.addEventListener('click',togglePlay);
toggle.addEventListener('click',togglePlay);
video.addEventListener('play',updatButton);
video.addEventListener('pause',updatButton);

video.addEventListener('timeupdate',handleProgress);
progress.addEventListener('click',scrub);

let mousedown=false;
progress.addEventListener('mousemove', (e)=>{
	if(mousedown){
    	scrub(e);
	}
});
progress.addEventListener('mousedown',()=> mousedown=true);
progress.addEventListener('mouseup', ()=>mousedown=false);

ranges[0].addEventListener('change',changeVolume);
ranges[1].addEventListener('change',changeSpeed);


skipButtons.forEach(skipBtn=>{
	skipBtn.addEventListener('click',skip);
})

fsButton.addEventListener('click',fullScreen);