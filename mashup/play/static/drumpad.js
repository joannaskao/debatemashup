
var channel_max = 20;
var sound_library = {};
var channels = [];
for (var a=0; a<channel_max; a++) {      // prepare the channels
  channels[a] = {};
  channels[a].audio = new Audio();  // create a new audio object
  channels[a].finished = -1;          // expected end time for this channel
}

function playSound(soundId) {
  var handle = sound_library[soundId];

  for (var i=0; i < channels.length; i++) {
    var now = new Date();
    if (channels[i].finished < now.getTime()) { 
      var channel = channels[i];
      channel.finished = now.getTime() + handle.duration*1000;
      channel.audio.src = handle.src;
      channel.audio.load();
      channel.audio.play();
      break;
    }
  }
}

function keyPressed(key) {

  playSound('a');//right now, just ignore the key, play our single audio file

}
$(document).ready(function() {
    // Handler for .ready() called.;

  var handle = document.getElementById("sound-a");
  var handle2 = document.getElementById("sound-b");;
  //handle.play();
  sound_library['a'] = handle;
  sound_library['s'] = handle2;

  $(document).keydown(function(e) {

    console.log(e.keyCode);
    switch(e.keyCode) {
      case 65   : keyPressed('a'); break;
      case 83   : keyPressed('s'); break;
      case 68   : keyPressed('d'); break;
      case 70  : keyPressed('f'); break;
      break;
    }
  });
    
});
