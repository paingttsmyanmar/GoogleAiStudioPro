function speakText(){

let text =
document.getElementById("text").value;


let speech =
new SpeechSynthesisUtterance(text);


speech.lang="my-MM";

speech.rate=1;

speech.pitch=1;


window.speechSynthesis.speak(
speech
);

}



function stopSpeak(){

window.speechSynthesis.cancel();

}




async function generateAI(){


let key =
document.getElementById("apiKey").value;


let text =
document.getElementById("text").value;



if(!key){

alert("Enter Gemini API Key");

return;

}



let response =
await fetch(

"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="+key,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

contents:[{

parts:[{

text:text

}]

}]

})


}


);



let data =
await response.json();


document.getElementById("text").value =
data.candidates[0].content.parts[0].text;


  }
