  const checkboxes=document.querySelectorAll(".item input[type=checkbox]");

  let lastChecked="";

  function handleCheck(e){
    //check if shift key is down
    //AND check if they are checking it.
    let inBetween=false;
    if(e.shiftKey && this.checked){
      checkboxes.forEach( checkbox => {
        console.log(checkbox);
        if(checkbox===this || checkbox===lastChecked){
          inBetween=!inBetween;
          console.log("Starting check");
        }
        if(inBetween){
          checkbox.checked=true;
        }
      })
    }
    lastChecked=this;

  }

  checkboxes.forEach( checkbox => {
      checkbox.addEventListener("click",handleCheck)
  });

