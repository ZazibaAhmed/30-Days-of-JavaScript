let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
	// clear any existing timers
	clearInterval(countdown);
	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);

	countdown = setInterval( () => {
		const secondsLeft = Math.round(( then - Date.now())/1000);
		// check if we should stop it
		if( secondsLeft < 0 ){
			clearInterval(countdown);
			return;
		}
		// display it
		displayTimeLeft(secondsLeft);
	}, 1000);
}

function displayTimeLeft(seconds){
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${ minutes < 10 ? '0' : '' }${minutes}:${ remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
	timerDisplay.textContent = display;
	document.title = display;
	// console.log({minutes,remainderSeconds});
}

function displayEndTime(timestamp){
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
	endTime.textContent = `Be Back At ${hour <= 12 ? hour : hour-12}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer(){
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

buttons.forEach( button => button.addEventListener('click',startTimer));
// if and element has the attribute name, you can simply write document.attrbuteName and it will 
// give you the element
document.customForm.addEventListener('submit', function(e){
	// stops the default get method
	e.preventDefault();
	const mins = this.minutes.value;
	console.log(mins);
	timer(mins*60);
	this.reset();
});