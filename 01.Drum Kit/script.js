 function playSound(event){
    let audio=document.querySelector(`audio[data-key="${event.keyCode}"]`);
    let key=document.querySelector(`.key[data-key="${event.keyCode}"]`);
    if(!audio) return//stops the function from running all together
    audio.play();
    audio.currentTime=0;//rewind to the start
    key.classList.add("playing");
  }

  function removeTransition(event)
  {
    if(event.propertyName!=="transform") return;//skip it if it's not a transform
    this.classList.remove("playing");
  }
  
 const keys=document.querySelectorAll(".key");
 keys.forEach(key => key.addEventListener("transitionend", removeTransition));
 window.addEventListener("keydown", playSound);