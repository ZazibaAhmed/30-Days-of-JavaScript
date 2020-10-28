const divs = document.querySelectorAll('div');
const button = document.querySelector('button');


// console.log(divs);
function logText(e){
	console.log(this.classList.value);
	// stop bubbling this event up
	// e.stopPropagation(); // stop bubbling!
	// console.log(this);
}

// The t3rd parameter is an options object
// By default capture is false
divs.forEach( div => div.addEventListener('click', logText, { 
	capture: true,
	// it will unblind it self which is the same as div.removeEventListener('click', logText)
	// once: true
}));

button.addEventListener('click', () => { 
	console.log("Click!!!");
}, {
	once: true
});

