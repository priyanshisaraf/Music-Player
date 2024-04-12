$("#pause").hide();
var track_pic = document.querySelector("#track-pic");
var track_name = document.querySelector(".track-name");
var track_artist = document.querySelector(".track-artist");

var track_index = 0;

var seek_slider = document.querySelector(".seek_slider");
var volume_slider = document.querySelector(".volume_slider");
var curr_time = document.querySelector(".current-time");
var total_duration = document.querySelector(".total-duration");

var isPlaying = false;
var updateTimer;

var count=0;
var curr_track=document.getElementById('track');

var track_list = [
{
	name: "Ni Nachleh",
	artist: "Imran Khan",
	image: "ninachleh.jpeg",
	path: "Ni Nachleh.mp3",
    color: "lightgreen"
},
{
	name: "Only Girl",
	artist: "Rihanna",
	image: "onlygirl.jpeg",
	path: "Only Girl.mp3",
    color: "lightpink"
},
{
	name: "Shivers",
	artist: "Ed Sheeren",
	image: "shivers.jpeg",
	path: "shivers.mp3",
    color: "lightblue"
},
];
track_artist.textContent=track_list[track_index].artist;
track_name.textContent=track_list[track_index].name;
track_pic.src=track_list[track_index].image;
curr_track.src=track_list[track_index].path;
$(".player").css("background-color",track_list[track_index].color);


function prevTrack(){
    track_index-=1;
    if (track_index==-1){
        track_index=2;
    }
    track_artist.textContent=track_list[track_index].artist;
    track_name.textContent=track_list[track_index].name;
    curr_track.src=track_list[track_index].path;
    track_pic.src=track_list[track_index].image;
    $("#play").hide();
    $("#pause").show();
    curr_track.play();
    count+=1;
    $(".player").css("background-color",track_list[track_index].color);
    track.addEventListener('timeupdate', updateTime);
    updateTime();
}
function playpauseTrack(){
    count+=1;
    if (count%2!=0){
        $("#play").hide();
        $("#pause").show();
        curr_track.play();
        track.addEventListener('timeupdate', updateTime);
    }
    else{
        $("#pause").hide();
        $("#play").show();
        curr_track.pause();
        track.removeEventListener('timeupdate', updateTime);
    }
}
function nextTrack(){
    track_index+=1;
    if (track_index==3){
        track_index=0;
    }
    track_artist.textContent=track_list[track_index].artist;
    track_name.textContent=track_list[track_index].name;
    curr_track.src=track_list[track_index].path;
    track_pic.src=track_list[track_index].image;
    $("#play").hide();
    $("#pause").show();
    curr_track.play();
    count+=1;
    $(".player").css("background-color",track_list[track_index].color);
    track.addEventListener('timeupdate', updateTime);
    updateTime();
}


function updateTime() {
    var currentMinutes = Math.floor(track.currentTime / 60);
    var currentSeconds = Math.floor(track.currentTime - currentMinutes * 60);
    var durationMinutes = Math.floor(track.duration / 60);
    var durationSeconds = Math.floor(track.duration - durationMinutes * 60);
    currentSeconds = (currentSeconds < 10) ? "0" + currentSeconds : currentSeconds;
    durationSeconds = (durationSeconds < 10) ? "0" + durationSeconds : durationSeconds;

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;

    var position = track.currentTime / track.duration;
    seek_slider.value = position * 100;
    
}


function seekTo(){
    var seekPosition = track.duration * (seek_slider.value / 100);
    track.currentTime = seekPosition;
}
function setVolume(){
    var volume=volume_slider.value/100;
    track.volume=volume;
}