var tempo_sec = 0.5; //once every second
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

      break;
    }
  }
}
*/

// ***** Helper Audio Code  ********

function timeToNextInterval() {
  var delta = audio_context.currentTime - clock_start;
  var time_to_interval = delta % tempo_sec;
  console.log("time to interval"+ time_to_interval);
  return (audio_context.currentTime + time_to_interval);
}

function metronome() {
  if (buffer_list["120bpm"]) {
    var source = audio_context.createBufferSource();
    source.buffer = buffer_list["120bpm"];
    source.connect(audio_context.destination);
    source.loop = true;
    source.noteOn(0);
    console.log("metronome");
  }
}

function toggleBackgroundAudio() {
  if (background_source == null) {
    background_source = audio_context.createBufferSource();
    background_source.buffer = buffer_list["background"];
    background_source.connect(audio_context.destination);
    background_source.loop = true;
  }
  if (background_source.playbackState == 2) {
    background_source.noteOff(0);
  } else {
    background_source.noteOn(0);
  }

}

// ***** AudioContext Specific ********

function webkitPlaySound(audio_buf, delay ) {
  delay = typeof delay !== 'undefined' ? delay : 0;
  var source = audio_context.createBufferSource();
  source.buffer = audio_buf;
  source.connect(audio_context.destination);
  source.noteOn(delay);
  return source;
}
function loadDataFromSource(key, url, callback) {
  var request = new XMLHttpRequest();
  request.open('get', url, true);
  request.responseType = 'arraybuffer';
  // decode asynchronously
  request.onload = callback;
  request.send();
  return request;
}

// *********** Event Handling Code **********
function playForKey(code) {
  var buffer = buffer_list[code];

  if(audio_context.currentTime < buffer.finishTime && buffer.currentSource != null) {
    buffer.currentSource.noteOff(0);
    buffer.finishTime = -1;
  }
  

  if(audio_context.currentTime  > buffer.finishTime) {
    var nextTimeStamp = timeToNextInterval();
    var source = webkitPlaySound(buffer.buffer, 0);
    buffer.currentSource = source;
    buffer.finishTime = audio_context.currentTime + buffer.buffer.duration;
    //buffer.finishTime = nextTimeStamp + tempo_sec;
    //console.log("register sound", nextTimeStamp);
    //buffer.finishTime = new Date().getTime() + buffer.buffer.duration*1000;
  } else {
    console.log("already playing");
  }

}

// keymapper maps keys to their event code
keymapper = {
  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',
  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90: 'z',
}

function handleKeyPress(e) {

  if (typeof clock_start === 'undefined') {
    clock_start = audio_context.currentTime;
    metronome();
  }

  if (e.keyCode in keymapper){
    playForKey(keymapper[e.keyCode]);
  }
}

function mapBufferToList(buffer, key) {
  buffer_list[key] = {};
  buffer_list[key].buffer = buffer;
  buffer_list[key].finishTime = -1;
  buffer_list[key].currentSource = null;
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
      "samples/what it takes.wav",
      "samples/binders full of women.wav",
      "samples/120bpm.mp3"
    ], 
    function(list) {
      mapBufferToList(list[0], 'a');
      mapBufferToList(list[1], 's');
      mapBufferToList(list[list.length-1], 'background');
      $('#loadingscreen').remove(); // removes the loading screen
  });
  bufferLoader.load();
  
}

function setup() {
  try {
    audio_context = new webkitAudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}

function spinner(){
    var opts = {
    lines: 13, // The number of lines to draw
    length: 7, // The length of each line
    width: 4, // The line thickness
    radius: 10, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    color: '#EEE', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
  };
  var target = document.getElementById('loadingscreen');
  var spinner = new Spinner(opts).spin(target);
}

$(document).ready(function() {
  // Handler for .ready() called.;
  spinner()
  setup();
  preloadData();

  document.addEventListener(
    "keydown",
    function(e) {
      handleKeyPress(e);
    },
    false);

  init_interactions();

});
