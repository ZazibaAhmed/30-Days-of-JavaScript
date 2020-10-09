function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    let context = this, args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

let sliderImages = document.querySelectorAll(".slide-in");

function checkSlide(e){
  sliderImages.forEach( sliderImg => {
    // Halfway through the image
    const slideInAt = ( window.scrollY + window.innerHeight ) - sliderImg.height/2;
    // Bottom of the image
    const imageBottom = sliderImg.offsetTop + sliderImg.height;
    const isHalfShown = slideInAt > sliderImg.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if( isHalfShown && isNotScrolledPast ){
      sliderImg.classList.add('active');
    }
    else{
      sliderImg.classList.remove('active');
    }
  })
  
}

window.addEventListener('scroll', debounce(checkSlide));