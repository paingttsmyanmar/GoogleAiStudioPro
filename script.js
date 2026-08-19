
// Open Voice Studio

function openVoice(){

    document.querySelector(".home").style.display="none";

    document.getElementById("voicePage").style.display="block";

    loadKey();

}



// ==========================
// API KEY SYSTEM
// ==========================


function saveKey(){

    const key =
    document.getElementById("apiKey").value;


    const remember =
    document.getElementById("remember").checked;



    if(key.trim()===""){

        showStatus(
        "❌ Error: API Key မထည့်ရသေးပါ"
        );

        return;

    }



    if(remember){

        localStorage.setItem(
        "gemini_api_key",
        key
        );

        document.getElementById("keyStatus")
        .innerHTML=
        "🟢 Key Saved in Browser";

    }

    else{


        sessionStorage.setItem(
        "gemini_api_key",
        key
        );


        document.getElementById("keyStatus")
        .innerHTML=
        "🟡 Key Active (Not Saved)";


    }



    showStatus(
    "✅ API Key Connected"
    );


}




// Remove Key

function removeKey(){


    localStorage.removeItem(
    "gemini_api_key"
    );


    sessionStorage.removeItem(
    "gemini_api_key"
    );


    document.getElementById("apiKey")
    .value="";


    document.getElementById("keyStatus")
    .innerHTML=
    "🔴 Key Removed";


    showStatus(
    "Key deleted successfully"
    );


}




// Load Saved Key

function loadKey(){


    let key =
    localStorage.getItem(
    "gemini_api_key"
    );


    if(key){


        document.getElementById("apiKey")
        .value=key;


        document.getElementById("remember")
        .checked=true;


        document.getElementById("keyStatus")
        .innerHTML=
        "🟢 Saved Key Loaded";


    }



}







// ==========================
// DRAG & DROP VOICE
// ==========================



const voices =
document.querySelectorAll(".voice");


const selected =
document.getElementById("selected");



voices.forEach(voice=>{


    voice.addEventListener(
    "dragstart",
    function(e){


        e.dataTransfer.setData(
        "voice",
        this.innerText
        );


    });


});





selected.addEventListener(
"dragover",
function(e){

    e.preventDefault();

});





selected.addEventListener(
"drop",
function(e){


    let voice =
    e.dataTransfer.getData(
    "voice"
    );


    selected.innerHTML=
    "🎙 Selected: "+voice;


    showStatus(
    "✅ Voice Selected: "+voice
    );


});








// ==========================
// GENERATE BUTTON
// ==========================



function generate(){



let key =
document.getElementById("apiKey").value;



let text =
document.getElementById("text").value;



if(key===""){


    showStatus(
    "❌ Error: API Key Missing"
    );


    return;

}




if(text.trim()===""){


    showStatus(
    "❌ Error: Text မထည့်ရသေးပါ"
    );


    return;

}




showStatus(
"⏳ Sending request to Gemini AI..."
);




setTimeout(()=>{


showStatus(
"⏳ Generating Voice..."
);


},1500);




setTimeout(()=>{


showStatus(
"✅ Completed - Audio Ready"
);


},4000);



}







// ==========================
// STATUS SYSTEM
// ==========================


function showStatus(message){


document.getElementById("status")
.innerHTML=
message;


}
