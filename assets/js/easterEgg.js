// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

$(document).ready(function () {

var listsKeys =  [];
var compareListsCats =  ['ARROWUP','ARROWDOWN','ARROWLEFT','ARROWRIGHT','ARROWUP','ARROWDOWN','ARROWLEFT','ARROWRIGHT'];
var compareListsRainbow =  ['ARROWUP','ARROWRIGHT','ARROWUP','ARROWRIGHT','ARROWUP','ARROWRIGHT','ARROWUP','ARROWRIGHT'];

    document.addEventListener("keyup", function(event) {
      listsKeys.push((event.key).toUpperCase());
      if(JSON.stringify(listsKeys)==JSON.stringify(compareListsCats))
      {            
            startInfiniteConfetti(); 
            listsKeys = []
            
      }
      if(JSON.stringify(listsKeys)==JSON.stringify(compareListsRainbow))
      {
        startRainbow();
         listsKeys = []
      }
    
    });
});
