
var sound_library = {};

function playSound(soundId) {
  var handle = sound_library['1'];
  handle.play();
}

$(document).ready(function() {
  
    // Handler for .ready() called.;

    var handle = document.getElementById("soundhandle");
    //handle.play();
    sound_library['1'] = handle;


  $(document).keydown(function(e) {
    if (e.keyCode == 65) {

      playSound(2);
    }
  });
    
});
