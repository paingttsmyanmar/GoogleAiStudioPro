// =============================================
// AI VOICE STUDIO
// Gemini TTS - GitHub Pages Frontend
// =============================================


const MODEL =
    "gemini-3.1-flash-tts-preview";


const API_BASE =
    "https://generativelanguage.googleapis.com/v1beta";


const STORAGE_KEY =
    "my_gemini_api_key";


// =============================================
// ALL GEMINI TTS VOICES - 30
// =============================================

const VOICES = [

    {
        name: "Zephyr",
        style: "Bright"
    },

    {
        name: "Puck",
        style: "Upbeat"
    },

    {
        name: "Charon",
        style: "Informative"
    },

    {
        name: "Kore",
        style: "Firm"
    },

    {
        name: "Fenrir",
        style: "Excitable"
    },

    {
        name: "Leda",
        style: "Youthful"
    },

    {
        name: "Orus",
        style: "Firm"
    },

    {
        name: "Aoede",
        style: "Breezy"
    },

    {
        name: "Callirrhoe",
        style: "Easy-going"
    },

    {
        name: "Autonoe",
        style: "Bright"
    },

    {
        name: "Enceladus",
        style: "Breathy"
    },

    {
        name: "Iapetus",
        style: "Clear"
    },

    {
        name: "Umbriel",
        style: "Easy-going"
    },

    {
        name: "Algieba",
        style: "Smooth"
    },

    {
        name: "Despina",
        style: "Smooth"
    },

    {
        name: "Erinome",
        style: "Clear"
    },

    {
        name: "Algenib",
        style: "Gravelly"
    },

    {
        name: "Rasalgethi",
        style: "Informative"
    },

    {
        name: "Laomedeia",
        style: "Upbeat"
    },

    {
        name: "Achernar",
        style: "Soft"
    },

    {
        name: "Alnilam",
        style: "Firm"
    },

    {
        name: "Schedar",
        style: "Even"
    },

    {
        name: "Gacrux",
        style: "Mature"
    },

    {
        name: "Pulcherrima",
        style: "Forward"
    },

    {
        name: "Achird",
        style: "Friendly"
    },

    {
        name: "Zubenelgenubi",
        style: "Casual"
    },

    {
        name: "Vindemiatrix",
        style: "Gentle"
    },

    {
        name: "Sadachbia",
        style: "Lively"
    },

    {
        name: "Sadaltager",
        style: "Knowledgeable"
    },

    {
        name: "Sulafat",
        style: "Warm"
    }

];


// =============================================
// ELEMENTS
// =============================================

const homePage =
    document.getElementById("homePage");

const studioPage =
    document.getElementById("studioPage");

const openStudioBtn =
    document.getElementById("openStudioBtn");

const backBtn =
    document.getElementById("backBtn");


const apiKeyInput =
    document.getElementById("apiKey");

const rememberKey =
    document.getElementById("rememberKey");

const saveKeyBtn =
    document.getElementById("saveKeyBtn");

const testKeyBtn =
    document.getElementById("testKeyBtn");

const changeKeyBtn =
    document.getElementById("changeKeyBtn");

const removeKeyBtn =
    document.getElementById("removeKeyBtn");

const toggleKeyBtn =
    document.getElementById("toggleKeyBtn");

const keyStatusBadge =
    document.getElementById("keyStatusBadge");


const voiceSelect =
    document.getElementById("voiceSelect");

const selectedVoiceName =
    document.getElementById("selectedVoiceName");

const selectedVoiceStyle =
    document.getElementById("selectedVoiceStyle");


const emotionSelect =
    document.getElementById("emotionSelect");

const speedSelect =
    document.getElementById("speedSelect");


const volumeSlider =
    document.getElementById("volumeSlider");

const volumeValue =
    document.getElementById("volumeValue");


const voiceText =
    document.getElementById("voiceText");

const characterCount =
    document.getElementById("characterCount");


const generateBtn =
    document.getElementById("generateBtn");

const generateText =
    document.getElementById("generateText");

const generateIcon =
    document.getElementById("generateIcon");


const processBadge =
    document.getElementById("processBadge");

const progressBar =
    document.getElementById("progressBar");

const statusHeadline =
    document.getElementById("statusHeadline");

const statusLog =
    document.getElementById("statusLog");


const audioOutput =
    document.getElementById("audioOutput");

const audioPlayer =
    document.getElementById("audioPlayer");

const waveform =
    document.getElementById("waveform");

const downloadBtn =
    document.getElementById("downloadBtn");

const outputVoice =
    document.getElementById("outputVoice");

const outputEmotion =
    document.getElementById("outputEmotion");


let currentAudioURL = null;


// =============================================
// INITIALIZATION
// =============================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        populateVoices();

        loadSavedKey();

        updateVoiceInfo();

        updateCharacterCount();

        updateVolume();

    }
);


// =============================================
// PAGE NAVIGATION
// =============================================

openStudioBtn.addEventListener(
    "click",
    () => {

        homePage.classList.add("hidden");

        studioPage.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


backBtn.addEventListener(
    "click",
    () => {

        studioPage.classList.add("hidden");

        homePage.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// =============================================
// POPULATE VOICES
// =============================================

function populateVoices(){

    voiceSelect.innerHTML = "";


    VOICES.forEach(
        voice => {

            const option =
                document.createElement("option");

            option.value =
                voice.name;

            option.textContent =
                `${voice.name} — ${voice.style}`;

            option.dataset.style =
                voice.style;


            voiceSelect.appendChild(
                option
            );

        }
    );

}


voiceSelect.addEventListener(
    "change",
    updateVoiceInfo
);


function updateVoiceInfo(){

    const selected =
        voiceSelect.selectedOptions[0];

    if(!selected){
        return;
    }


    selectedVoiceName.textContent =
        selected.value;

    selectedVoiceStyle.textContent =
        selected.dataset.style || "";

}


// =============================================
// API KEY SYSTEM
// =============================================

function loadSavedKey(){

    const savedKey =
        localStorage.getItem(
            STORAGE_KEY
        );


    if(savedKey){

        apiKeyInput.value =
            savedKey;

        rememberKey.checked =
            true;

        setKeyStatus(
            "Saved",
            "success"
        );

    }

}


saveKeyBtn.addEventListener(
    "click",
    saveApiKey
);


function saveApiKey(){

    const key =
        apiKeyInput.value.trim();


    if(!key){

        setKeyStatus(
            "Missing",
            "error"
        );

        resetStatus();

        setProcessStatus(
            "API Key မထည့်ရသေးပါ။",
            "error"
        );

        addLog(
            "❌ Gemini API Key ထည့်ပါ။",
            "error"
        );

        return;

    }


    if(rememberKey.checked){

        localStorage.setItem(
            STORAGE_KEY,
            key
        );


        setKeyStatus(
            "Saved",
            "success"
        );


        setProcessStatus(
            "API Key ကို Browser ထဲမှာ Save လုပ်ပြီးပါပြီ။",
            "success"
        );


        addLog(
            "✅ API Key saved in this browser.",
            "success"
        );

    }

    else{

        localStorage.removeItem(
            STORAGE_KEY
        );


        setKeyStatus(
            "Session",
            "success"
        );


        setProcessStatus(
            "API Key ကို Save မလုပ်ဘဲ အသုံးပြုနေပါသည်။",
            "success"
        );


        addLog(
            "✅ API Key is active but not saved.",
            "success"
        );

    }

}


// =============================================
// TEST KEY
// =============================================

testKeyBtn.addEventListener(
    "click",
    testApiKey
);


async function testApiKey(){

    const key =
        apiKeyInput.value.trim();


    if(!key){

        setKeyStatus(
            "Missing",
            "error"
        );

        setProcessStatus(
            "API Key ထည့်ပြီးမှ Test လုပ်ပါ။",
            "error"
        );

        return;

    }


    testKeyBtn.disabled = true;

    setKeyStatus(
        "Testing...",
        "loading"
    );


    resetStatus();

    setProgress(
        25,
        "API Key စမ်းသပ်နေပါသည်..."
    );


    addLog(
        "⏳ Connecting to Gemini API...",
        "info"
    );


    try{

        const response =
            await fetch(
                `${API_BASE}/models/${MODEL}`,
                {
                    method: "GET",

                    headers: {
                        "x-goog-api-key": key
                    }
                }
            );


        if(!response.ok){

            throw await createApiError(
                response
            );

        }


        setProgress(
            100,
            "API Key အလုပ်လုပ်ပါသည်။"
        );


        setKeyStatus(
            "Connected",
            "success"
        );


        setProcessBadge(
            "Connected",
            "success"
        );


        addLog(
            "✅ Gemini API connection successful.",
            "success"
        );

    }

    catch(error){

        setKeyStatus(
            "Error",
            "error"
        );


        handleError(
            error
        );

    }

    finally{

        testKeyBtn.disabled =
            false;

    }

}


// =============================================
// CHANGE KEY
// =============================================

changeKeyBtn.addEventListener(
    "click",
    () => {

        apiKeyInput.type =
            "text";

        apiKeyInput.focus();

        apiKeyInput.select();


        setKeyStatus(
            "Editing",
            "loading"
        );


        setProcessStatus(
            "API Key အသစ်ကို ရိုက်ထည့်နိုင်ပါပြီ။",
            "info"
        );

    }
);


// =============================================
// REMOVE KEY
// =============================================

removeKeyBtn.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            STORAGE_KEY
        );


        apiKeyInput.value = "";

        rememberKey.checked =
            false;


        setKeyStatus(
            "Removed",
            "error"
        );


        resetStatus();


        setProcessStatus(
            "API Key ကို ဖယ်ရှားပြီးပါပြီ။",
            "success"
        );


        addLog(
            "✅ Saved API Key removed.",
            "success"
        );

    }
);


// =============================================
// SHOW / HIDE KEY
// =============================================

toggleKeyBtn.addEventListener(
    "click",
    () => {

        if(
            apiKeyInput.type
            ===
            "password"
        ){

            apiKeyInput.type =
                "text";

            toggleKeyBtn.textContent =
                "🙈";

        }

        else{

            apiKeyInput.type =
                "password";

            toggleKeyBtn.textContent =
                "👁";

        }

    }
);


// =============================================
// TEXT COUNTER
// =============================================

voiceText.addEventListener(
    "input",
    updateCharacterCount
);


function updateCharacterCount(){

    const count =
        voiceText.value.length;


    characterCount.textContent =
        `${count.toLocaleString()} characters`;

}


// =============================================
// VOLUME
// =============================================

volumeSlider.addEventListener(
    "input",
    updateVolume
);


function updateVolume(){

    const value =
        Number(
            volumeSlider.value
        );


    volumeValue.textContent =
        `${value}%`;


    audioPlayer.volume =
        value / 100;

}


// =============================================
// EMOTION PROMPTS
// =============================================

const EMOTIONS = {

    natural:
        "Speak naturally, clearly, and smoothly.",

    happy:
        "Speak in a happy, cheerful, warm and positive tone.",

    excited:
        "Speak with strong excitement, energy and enthusiasm.",

    calm:
        "Speak calmly, softly and peacefully.",

    serious:
        "Speak in a serious, confident and focused tone.",

    dramatic:
        "Speak dramatically like a cinematic narrator, with expressive delivery.",

    sad:
        "Speak with a sad, emotional and gentle tone.",

    angry:
        "Speak with controlled anger and intensity while keeping the words clear.",

    friendly:
        "Speak in a friendly, welcoming and conversational tone.",

    news:
        "Speak clearly and professionally like a television news narrator.",

    story:
        "Speak like an engaging professional storyteller with expressive pacing.",

    whisper:
        "Speak softly in a gentle whisper while remaining understandable."

};


// =============================================
// PACE PROMPTS
// =============================================

const PACES = {

    "0.5":
        "Speak at a very slow, relaxed pace.",

    "0.75":
        "Speak slowly and clearly.",

    "1":
        "Speak at a natural normal pace.",

    "1.25":
        "Speak slightly faster than normal while staying natural.",

    "1.5":
        "Speak at a fast and energetic pace while remaining clear.",

    "2":
        "Speak very quickly while keeping every word understandable.",

    "3":
        "Speak at an extremely fast pace while preserving clear pronunciation.",

    "4":
        "Speak as fast as naturally possible while keeping the speech understandable."

};


// =============================================
// GENERATE VOICE
// =============================================

generateBtn.addEventListener(
    "click",
    generateVoice
);


async function generateVoice(){

    const key =
        apiKeyInput.value.trim();

    const text =
        voiceText.value.trim();

    const voice =
        voiceSelect.value;

    const emotion =
        emotionSelect.value;

    const speed =
        speedSelect.value;


    // VALIDATION

    if(!key){

        resetStatus();

        setProcessStatus(
            "Gemini API Key မရှိပါ။",
            "error"
        );

        addLog(
            "❌ API Key ထည့်ရန်လိုအပ်ပါသည်။",
            "error"
        );

        return;

    }


    if(!voice){

        setProcessStatus(
            "Voice ရွေးချယ်ပါ။",
            "error"
        );

        return;

    }


    if(!text){

        setProcessStatus(
            "အသံထုတ်ရန် စာသားထည့်ပါ။",
            "error"
        );

        addLog(
            "❌ Voice Script is empty.",
            "error"
        );

        return;

    }


    // RESET OUTPUT

    audioOutput.classList.add(
        "hidden"
    );


    generateBtn.disabled =
        true;


    generateIcon.textContent =
        "⏳";


    generateText.textContent =
        "Generating...";


    resetStatus();


    setProcessBadge(
        "Working",
        "loading"
    );


    // STEP 1

    setProgress(
        10,
        "Input စစ်ဆေးနေပါသည်..."
    );


    addLog(
        "✅ API Key detected.",
        "success"
    );


    addLog(
        `✅ Voice selected: ${voice}`,
        "success"
    );


    addLog(
        `✅ Script received: ${text.length.toLocaleString()} characters`,
        "success"
    );


    try{

        // STEP 2

        setProgress(
            25,
            "Gemini TTS Request ပြင်ဆင်နေပါသည်..."
        );


        const prompt =
            buildPrompt(
                text,
                emotion,
                speed
            );


        // STEP 3

        setProgress(
            40,
            "Gemini AI ကို Request ပို့နေပါသည်..."
        );


        addLog(
            "⏳ Sending request to Gemini TTS...",
            "info"
        );


        const response =
            await fetch(
                `${API_BASE}/models/${MODEL}:generateContent`,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "x-goog-api-key":
                            key

                    },

                    body:
                        JSON.stringify({

                            contents: [
                                {
                                    parts: [
                                        {
                                            text:
                                                prompt
                                        }
                                    ]
                                }
                            ],

                            generationConfig: {

                                responseModalities: [
                                    "AUDIO"
                                ],

                                speechConfig: {

                                    voiceConfig: {

                                        prebuiltVoiceConfig: {

                                            voiceName:
                                                voice

                                        }

                                    }

                                }

                            }

                        })

                }
            );


        // API ERROR

        if(!response.ok){

            throw await createApiError(
                response
            );

        }


        // STEP 4

        setProgress(
            65,
            "Gemini Audio Response ရရှိပါပြီ..."
        );


        addLog(
            "✅ Gemini response received.",
            "success"
        );


        const data =
            await response.json();


        const audioPart =
            data
            ?.candidates
            ?.[0]
            ?.content
            ?.parts
            ?.find(
                part =>
                    part.inlineData
                    ?.data
            );


        if(
            !audioPart
            ||
            !audioPart.inlineData
            ||
            !audioPart.inlineData.data
        ){

            throw new Error(
                "Gemini က Audio Data ပြန်မပေးပါ။ Response မှာ audio output မတွေ့ပါ။"
            );

        }


        // STEP 5

        setProgress(
            78,
            "Audio Data ပြောင်းနေပါသည်..."
        );


        const pcmBytes =
            base64ToUint8Array(
                audioPart.inlineData.data
            );


        if(
            pcmBytes.length === 0
        ){

            throw new Error(
                "Audio Data is empty."
            );

        }


        // Gemini TTS PCM:
        // 24kHz / mono / 16-bit

        const wavBlob =
            createWavBlob(
                pcmBytes,
                24000,
                1,
                16
            );


        // REMOVE OLD URL

        if(currentAudioURL){

            URL.revokeObjectURL(
                currentAudioURL
            );

        }


        currentAudioURL =
            URL.createObjectURL(
                wavBlob
            );


        // STEP 6

        setProgress(
            90,
            "Audio Player ပြင်ဆင်နေပါသည်..."
        );


        audioPlayer.src =
            currentAudioURL;


        audioPlayer.volume =
            Number(
                volumeSlider.value
            ) / 100;


        audioPlayer.load();


        outputVoice.textContent =
            voice;


        outputEmotion.textContent =
            emotionSelect
            .selectedOptions[0]
            .textContent
            .trim();


        // DOWNLOAD

        downloadBtn.href =
            currentAudioURL;


        downloadBtn.download =
            createFileName(
                voice
            );


        // SHOW OUTPUT

        audioOutput.classList.remove(
            "hidden"
        );


        // WAVEFORM

        requestAnimationFrame(
            () => {

                drawWaveform(
                    pcmBytes
                );

            }
        );


        // COMPLETE

        setProgress(
            100,
            "Voice Generation ပြီးဆုံးပါပြီ 🎉"
        );


        setProcessBadge(
            "Completed",
            "success"
        );


        setKeyStatus(
            "Connected",
            "success"
        );


        addLog(
            "✅ Audio converted to WAV.",
            "success"
        );


        addLog(
            "🎧 Audio is ready to play.",
            "success"
        );


        addLog(
            "⬇️ Download button is ready.",
            "success"
        );


        audioOutput.scrollIntoView({

            behavior: "smooth",

            block: "nearest"

        });

    }

    catch(error){

        handleError(
            error
        );

    }

    finally{

        generateBtn.disabled =
            false;


        generateIcon.textContent =
            "✨";


        generateText.textContent =
            "Generate Voice";

    }

}


// =============================================
// BUILD GEMINI PROMPT
// =============================================

function buildPrompt(
    text,
    emotion,
    speed
){

    const emotionPrompt =
        EMOTIONS[emotion]
        ||
        EMOTIONS.natural;


    const pacePrompt =
        PACES[speed]
        ||
        PACES["1"];


    return `
# DIRECTOR'S NOTES

Style:
${emotionPrompt}

Pacing:
${pacePrompt}

Instructions:
Read the transcript exactly as written.
Do not translate it.
Do not summarize it.
Do not add new words.
Do not remove words.
Keep pronunciation natural and expressive.

# TRANSCRIPT

${text}
`.trim();

}


// =============================================
// BASE64 -> UINT8
// =============================================

function base64ToUint8Array(
    base64
){

    const binary =
        atob(base64);


    const bytes =
        new Uint8Array(
            binary.length
        );


    for(
        let i = 0;
        i < binary.length;
        i++
    ){

        bytes[i] =
            binary.charCodeAt(i);

    }


    return bytes;

}


// =============================================
// PCM -> WAV
// =============================================

function createWavBlob(
    pcmBytes,
    sampleRate = 24000,
    channels = 1,
    bitsPerSample = 16
){

    const headerSize =
        44;


    const buffer =
        new ArrayBuffer(
            headerSize
            +
            pcmBytes.length
        );


    const view =
        new DataView(
            buffer
        );


    const bytes =
        new Uint8Array(
            buffer
        );


    function writeString(
        offset,
        string
    ){

        for(
            let i = 0;
            i < string.length;
            i++
        ){

            view.setUint8(
                offset + i,
                string.charCodeAt(i)
            );

        }

    }


    const blockAlign =
        channels
        *
        bitsPerSample
        /
        8;


    const byteRate =
        sampleRate
        *
        blockAlign;


    // RIFF

    writeString(
        0,
        "RIFF"
    );


    view.setUint32(
        4,
        36 + pcmBytes.length,
        true
    );


    writeString(
        8,
        "WAVE"
    );


    // fmt

    writeString(
        12,
        "fmt "
    );


    view.setUint32(
        16,
        16,
        true
    );


    view.setUint16(
        20,
        1,
        true
    );


    view.setUint16(
        22,
        channels,
        true
    );


    view.setUint32(
        24,
        sampleRate,
        true
    );


    view.setUint32(
        28,
        byteRate,
        true
    );


    view.setUint16(
        32,
        blockAlign,
        true
    );


    view.setUint16(
        34,
        bitsPerSample,
        true
    );


    // data

    writeString(
        36,
        "data"
    );


    view.setUint32(
        40,
        pcmBytes.length,
        true
    );


    bytes.set(
        pcmBytes,
        44
    );


    return new Blob(
        [buffer],
        {
            type:
                "audio/wav"
        }
    );

}


// =============================================
// WAVEFORM
// =============================================

function drawWaveform(
    pcmBytes
){

    const ctx =
        waveform.getContext(
            "2d"
        );


    const ratio =
        window.devicePixelRatio
        ||
        1;


    const width =
        waveform.clientWidth;


    const height =
        110;


    waveform.width =
        width * ratio;


    waveform.height =
        height * ratio;


    ctx.scale(
        ratio,
        ratio
    );


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    const samples =
        new Int16Array(

            pcmBytes.buffer,

            pcmBytes.byteOffset,

            Math.floor(
                pcmBytes.byteLength / 2
            )

        );


    const center =
        height / 2;


    const bars =
        Math.max(
            40,
            Math.min(
                100,
                Math.floor(
                    width / 5
                )
            )
        );


    const step =
        Math.max(
            1,
            Math.floor(
                samples.length
                /
                bars
            )
        );


    const barWidth =
        Math.max(
            2,
            width
            /
            bars
            -
            2
        );


    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            width,
            0
        );


    gradient.addColorStop(
        0,
        "#007cff"
    );


    gradient.addColorStop(
        1,
        "#00d9ff"
    );


    ctx.fillStyle =
        gradient;


    for(
        let i = 0;
        i < bars;
        i++
    ){

        let max =
            0;


        const start =
            i * step;


        const end =
            Math.min(
                start + step,
                samples.length
            );


        for(
            let j = start;
            j < end;
            j++
        ){

            const value =
                Math.abs(
                    samples[j]
                );


            if(value > max){

                max =
                    value;

            }

        }


        const normalized =
            max / 32768;


        const barHeight =
            Math.max(
                4,
                normalized
                *
                height
                *
                .82
            );


        const x =
            i
            *
            (
                width / bars
            );


        const y =
            center
            -
            barHeight
            /
            2;


        ctx.beginPath();


        if(
            typeof ctx.roundRect
            ===
            "function"
        ){

            ctx.roundRect(
                x,
                y,
                barWidth,
                barHeight,
                3
            );

        }

        else{

            ctx.rect(
                x,
                y,
                barWidth,
                barHeight
            );

        }


        ctx.fill();

    }

}


// =============================================
// API ERROR
// =============================================

async function createApiError(
    response
){

    let apiMessage = "";


    try{

        const errorData =
            await response.json();


        apiMessage =
            errorData
            ?.error
            ?.message
            ||
            "";

    }

    catch{

        apiMessage =
            response.statusText;

    }


    let friendlyMessage =
        "Gemini API Error";


    switch(
        response.status
    ){

        case 400:

            friendlyMessage =
                "Request မှားနေပါသည် သို့မဟုတ် Voice / Model Setting မမှန်ပါ။";

            break;


        case 401:

            friendlyMessage =
                "API Key Authentication မအောင်မြင်ပါ။";

            break;


        case 403:

            friendlyMessage =
                "API Key Permission မရှိပါ သို့မဟုတ် API အသုံးပြုခွင့်ပိတ်ထားပါသည်။";

            break;


        case 404:

            friendlyMessage =
                "Gemini Model ကို မတွေ့ပါ။";

            break;


        case 429:

            friendlyMessage =
                "Rate Limit / Quota ပြည့်နေပါသည်။ ခဏနေရင် ပြန်စမ်းပါ။";

            break;


        case 500:

        case 502:

        case 503:

            friendlyMessage =
                "Google Gemini Server ဘက်မှာ ယာယီပြဿနာဖြစ်နေပါသည်။";

            break;

    }


    const error =
        new Error(
            apiMessage
            ?
            `${friendlyMessage} ${apiMessage}`
            :
            friendlyMessage
        );


    error.status =
        response.status;


    return error;

}


// =============================================
// GLOBAL ERROR HANDLER
// =============================================

function handleError(
    error
){

    console.error(
        error
    );


    setProgress(
        100,
        "Voice Generation မအောင်မြင်ပါ။"
    );


    setProcessBadge(
        "Error",
        "error"
    );


    let message =
        error
        ?.message
        ||
        "Unknown Error";


    if(
        error instanceof TypeError
    ){

        message =
            "Network Error ဖြစ်နိုင်ပါသည်။ Internet Connection သို့မဟုတ် Browser Request ကိုစစ်ပါ။";

    }


    statusHeadline.textContent =
        `❌ ${message}`;


    addLog(
        `❌ ${message}`,
        "error"
    );

}


// =============================================
// STATUS HELPERS
// =============================================

function resetStatus(){

    progressBar.style.width =
        "0%";


    statusLog.innerHTML =
        "";


    statusHeadline.textContent =
        "Processing စတင်ရန် အသင့်ဖြစ်နေပါပြီ။";


    setProcessBadge(
        "Ready",
        "neutral"
    );

}


function setProgress(
    percent,
    message
){

    progressBar.style.width =
        `${percent}%`;


    statusHeadline.textContent =
        message;

}


function setProcessStatus(
    message,
    type
){

    statusHeadline.textContent =
        message;


    setProcessBadge(
        type === "error"
            ? "Error"
            : "Ready",
        type
    );

}


function setProcessBadge(
    text,
    type
){

    processBadge.textContent =
        text;


    processBadge.className =
        `status-badge ${type}`;

}


function setKeyStatus(
    text,
    type
){

    keyStatusBadge.textContent =
        text;


    keyStatusBadge.className =
        `status-badge ${type}`;

}


function addLog(
    text,
    type = "info"
){

    const item =
        document.createElement(
            "li"
        );


    item.textContent =
        text;


    if(type === "success"){

        item.className =
            "success-log";

    }

    else if(type === "error"){

        item.className =
            "error-log";

    }

    else{

        item.className =
            "info-log";

    }


    statusLog.appendChild(
        item
    );

}


// =============================================
// DOWNLOAD FILE NAME
// =============================================

function createFileName(
    voice
){

    const now =
        new Date();


    const date =
        now
        .toISOString()
        .slice(
            0,
            19
        )
        .replace(
            /[:T]/g,
            "-"
        );


    return (
        `Gemini-${voice}-${date}.wav`
    );

}
