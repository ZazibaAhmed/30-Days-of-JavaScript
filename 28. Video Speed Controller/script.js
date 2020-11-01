const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');

// using function because we need "this" to be the actual speedbar
speed.addEventListener('mousemove', function(e){
	const y = e.pageY - this.offsetTop;
	const percent = y / this.offsetHeight;
	const min = 0.4;
	const max = 4;
	const height = Math.round(percent * 100) + '%';
	const playbackRate = percent * (max - min) + min;
	bar.style.height = height;
	// toFixed to 1 decimal place
	bar.textContent = playbackRate.toFixed(1) + 'x';
	video.playbackRate = playbackRate;

});