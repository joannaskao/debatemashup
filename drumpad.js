
var audio_context;
var buffer_list = {};

/*
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
*/
// ***** AudioContext Specific ********

function webkitPlaySound(audio_buf) {
  var source = audio_context.createBufferSource();
  source.buffer = audio_buf;
  source.connect(audio_context.destination);
  source.noteOn(0);
}
function loadDataFromSource(key, url) {
  var request = new XMLHttpRequest();
  request.open('get', url, true);
  request.responseType = 'arraybuffer';
  // decode asynchronously
  request.onload = function() {
  audio_context.decodeAudioData(request.response, function(buffer) {
    console.log('audio decode');
    buffer_list[key] = buffer;
    }, null);
  }
  request.send();
}

// *********** Event Handling Code **********
function playForKey(code) {
  code = 'a'; //ignore the actual keystroke, just play the one we have for now
  var buffer = buffer_list['a'];
  webkitPlaySound(buffer);
}

function handleKeyPress(e) {
  switch(e.keyCode) {
    case 65   : playForKey('a'); break;
    case 83   : playForKey('s'); break;
    case 68   : playForKey('d'); break;
    case 70  : playForKey('f'); break;
    break;
  }
}

function preloadData() {
/*
  var handle = document.getElementById("sound-a");
  var handle2 = document.getElementById("sound-b");;
  //handle.play();
  sound_library['a'] = handle;
  sound_library['s'] = handle2;
*/
  //loadDataFromSource("a", "samples/bingos_left_change.mp3");;

  var bufferLoader = new BufferLoader(
    audio_context,
    [
      "samples/bingos_left_change.mp3",
      "samples/bingos_left_change.mp3",
      "samples/bingos_left_change.mp3",
      "samples/bingos_left_change.mp3"
    ], 
    function(list) {
      alert("hello here");;
      buffer_list['a'] = list[0];
  });
  bufferLoader.load();
  
}

function setup() {
  try {
    audio_context = new webkitAudioContext();;
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }

}

$(document).ready(function() {
  // Handler for .ready() called.;
  setup();
  preloadData();
  $(document).keydown(function(e) {
    handleKeyPress(e);
  });
  
});
