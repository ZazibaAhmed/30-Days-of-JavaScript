const videos = Array.from( document.querySelectorAll('[data-time]')); //Array.from to convert nodelist to array
const seconds = videos.map( video => {
	const [ min , sec]= (video.dataset.time).split(':').map(parseFloat);
	return (min * 60) + sec;
})
.reduce( (acc, sec) =>  acc+sec );

let secondsLeft = seconds;
const hours = Math.floor( secondsLeft / 3600); // Math.floor to get whole number
secondsLeft = secondsLeft % 3600;
const mins = Math.floor( secondsLeft / 60);
secondsLeft = secondsLeft % 60;
console.log(hours, mins, secondsLeft);