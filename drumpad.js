var tempo_sec = 1; //once every second
var clock_start;
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

// ***** Helper Audio Code  ********

function timeToNextInterval() {
  var delta = audio_context.currentTime - clock_start;
  var time_to_interval = delta % tempo_sec;
  console.log("time to interval"+ time_to_interval + "delta" + delta);
  return (audio_context.currentTime + time_to_interval);
}

// ***** AudioContext Specific ********

function webkitPlaySound(audio_buf, delay ) {
  delay = typeof delay !== 'undefined' ? delay : 0;
     
  var source = audio_context.createBufferSource();
  source.buffer = audio_buf;
  source.connect(audio_context.destination);
  source.noteOn(delay);
}
function loadDataFromSource(key, url) {
  var request = new XMLHttpRequest();
  request.open('get', url, true);
  request.responseType = 'arraybuffer';
  // decode asynchronously
  request.onload = function() {
  audio_context.decodeAudioData(request.response, function(buffer) {
    buffer_list[key] = {};
    buffer_list[key].buffer = buffer;
    buffer_list[key].finishTime = -1;
    }, null);
  }
  request.send();
}

// *********** Event Handling Code **********
function playForKey(code) {
  code = 'a'; //ignore the actual keystroke, just play the one we have for now
  var buffer = buffer_list['a'];

  //figure out if its actually playing
  if(audio_context.currentTime  > buffer.finishTime) {
    var nextTimeStamp = timeToNextInterval();
    webkitPlaySound(buffer.buffer, nextTimeStamp);
    buffer.finishTime = nextTimeStamp + tempo_sec/2;
    console.log("register sound", nextTimeStamp);

    //buffer.finishTime = new Date().getTime() + buffer.buffer.duration*1000;
  } else {
    console.log("already playing");
  }

}

function handleKeyPress(e) {
  clock_start = typeof clock_start !== 'undefined' ? clock_start : audio_context.currentTime;
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
      var key = 'a';
      buffer_list[key] = {};
      buffer_list[key].buffer = list[0];
      buffer_list[key].finishTime = -1;
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

  document.addEventListener(
    "keydown",
    function(e) {
      handleKeyPress(e);
    },
    false);
  
});
