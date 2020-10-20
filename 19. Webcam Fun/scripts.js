const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
	navigator.mediaDevices.getUserMedia({ video: true, audio: false})
	.then( localMediaStream => {
		console.log(localMediaStream);
		// video.src= window.URL.createObjectUR(localMediaStream); THIS HAS BEEN DEPRECATED
		video.srcObject = localMediaStream;
		video.play();
	})
	.catch( err => {
		console.error('OH NO!!', err);
	});
}

function paintToCanvas(){
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height;

	setInterval( () => {
		ctx.drawImage(video, 0, 0, width, height); //0 0 means syart at the top left hand corner of the canvas and paint the width and height
		// for every pixel there are 4 values r, g, b, a(alpha)
		// take th epixels out
		let pixels = ctx.getImageData(0, 0, width, height); 
		// mess with them
		pixels = rgbSplit(pixels);
		// ctx.globalAlpha = 0.8;
		// pixels = greenScreen(pixels);
		// put them back
		ctx.putImageData(pixels, 0, 0);
	}, 16);
}

function takePhoto(){
	// Played the sound
	snap.currentTime = 0;
	snap.play();

	// Take the data out of the canvas
	const data = canvas.toDataURL('image/jpeg');
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download','Beautiful');
	link.innerHTML=`<img src="${data}" alt="Beautiful"/>`;
	strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels){
	// The pixels array is a speical type of array and so not using map
	for( let i=0 ; i < pixels.data.length; i += 4){
		pixels.data[i + 0] = pixels.data[i + 0] + 100 //red
		pixels.data[i + 1] = pixels.data[i + 1] - 50  //green
		pixels.data[i + 2] = pixels.data[i + 2] * 0.5 //blue

	}
	return pixels;

}

function rgbSplit(pixels){
	// The pixels array is a speical type of array and so not using map
	for( let i=0 ; i < pixels.data.length; i += 4){
		pixels.data[i - 150] = pixels.data[i + 0] //red
		pixels.data[i + 100] = pixels.data[i + 1] //green
		pixels.data[i - 150] = pixels.data[i + 2] //blue

	}
	return pixels;

}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
