let audioFile=null;


function generateVoice(){


let text=
document.getElementById("text").value;


let speed=
document.getElementById("speed").value;


let pitch=
document.getElementById("pitch").value;



if(!text){

alert("Enter text first");

return;

}


// Browser TTS Demo

let speech =
new SpeechSynthesisUtterance(text);


speech.rate=speed;

speech.pitch=pitch;


let voices =
speechSynthesis.getVoices();


speech.voice =
voices.find(v =>
v.name.includes("Google")
) || voices[0];


speechSynthesis.speak(speech);


}



function downloadAudio(){

alert(
"Real MP3 download requires Google TTS API connection."
);

}
