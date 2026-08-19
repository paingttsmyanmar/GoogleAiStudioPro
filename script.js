// ======================================================
// AI VOICE STUDIO
// Google Gemini 3.1 Flash TTS
// Frontend / GitHub Pages
// ======================================================


const MODEL =
    "gemini-3.1-flash-tts-preview";


const API_BASE =
    "https://generativelanguage.googleapis.com/v1beta";


const STORAGE_KEY =
    "gemini_voice_studio_api_key";


// ======================================================
// GEMINI TTS VOICES - ALL 30
// ======================================================

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


// ======================================================
// ELEMENTS
// ======================================================


const apiKeyInput =
    document.getElementById(
        "apiKey"
    );


const rememberKey =
    document.getElementById(
        "rememberKey"
    );


const saveKeyBtn =
    document.getElementById(
        "saveKeyBtn"
    );


const testKeyBtn =
    document.getElementById(
        "testKeyBtn"
    );


const changeKeyBtn =
    document.getElementById(
        "changeKeyBtn"
    );


const removeKeyBtn =
    document.getElementById(
        "removeKeyBtn"
    );


const toggleKeyBtn =
    document.getElementById(
        "toggleKeyBtn"
    );


const keyStatusBadge =
    document.getElementById(
        "keyStatusBadge"
    );


const voiceSelect =
    document.getElementById(
        "voiceSelect"
    );


const selectedVoiceName =
    document.getElementById(
        "selectedVoiceName"
    );


const selectedVoiceStyle =
    document.getElementById(
        "selectedVoiceStyle"
    );


const emotionSelect =
    document.getElementById(
        "emotionSelect"
    );


const speedSelect =
    document.getElementById(
        "speedSelect"
    );


const volumeSlider =
    document.getElementById(
        "volumeSlider"
    );


const volumeValue =
    document.getElementById(
        "volumeValue"
    );


const voiceText =
    document.getElementById(
        "voiceText"
    );


const characterCount =
    document.getElementById(
        "characterCount"
    );


const generateBtn =
    document.getElementById(
        "generateBtn"
    );


const generateIcon =
    document.getElementById(
        "generateIcon"
    );


const generateText =
    document.getElementById(
        "generateText"
    );


const processBadge =
    document.getElementById(
        "processBadge"
    );


const progressBar =
    document.getElementById(
        "progressBar"
    );


const statusHeadline =
    document.getElementById(
        "statusHeadline"
    );


const statusLog =
    document.getElementById(
        "statusLog"
    );


const audioOutput =
    document.getElementById(
        "audioOutput"
    );


const audioPlayer =
    document.getElementById(
        "audioPlayer"
    );


const waveform =
    document.getElementById(
        "waveform"
    );


const downloadBtn =
    document.getElementById(
        "downloadBtn"
    );


const outputVoice =
    document.getElementById(
        "outputVoice"
    );


const outputEmotion =
    document.getElementById(
        "outputEmotion"
    );


let currentAudioURL =
    null;


// ======================================================
// START APP
// ======================================================


document.addEventListener(
    "DOMContentLoaded",
    () => {

        populateVoices();

        loadSavedKey();

        updateVoiceInfo();

        updateCharacterCount();

        updateVolume();

        resetStatus();

    }
);


// ======================================================
// VOICE SELECT
// ======================================================


function populateVoices(){

    voiceSelect.innerHTML =
        "";


    VOICES.forEach(
        voice => {

            const option =
                document.createElement(
                    "option"
                );


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
    () => {

        updateVoiceInfo();


        const voice =
            voiceSelect.value;


        addLog(
            `🎙 Voice selected: ${voice}`,
            "info"
        );

    }
);


function updateVoiceInfo(){

    const selected =
        voiceSelect
        .selectedOptions[0];


    if(!selected){

        return;

    }


    selectedVoiceName.textContent =
        selected.value;


    selectedVoiceStyle.textContent =
        selected.dataset.style || "";

}


// ======================================================
// API KEY LOAD
// ======================================================


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


        addLog(
            "✅ Saved API Key loaded from browser.",
            "success"
        );

    }

}


// ======================================================
// SAVE API KEY
// ======================================================


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


        showError(
            "API Key မထည့်ရသေးပါ။"
        );


        return;

    }


    if(
        rememberKey.checked
    ){

        localStorage.setItem(
            STORAGE_KEY,
            key
        );


        setKeyStatus(
            "Saved",
            "success"
        );


        setProcessStatus(
            "API Key ကို ဒီ Browser ထဲမှာ Save လုပ်ပြီးပါပြီ။",
            "success"
        );


        addLog(
            "✅ API Key saved in browser.",
            "success"
        );

    }

    else{

        localStorage.removeItem(
            STORAGE_KEY
        );


        setKeyStatus(
            "Active",
            "success"
        );


        setProcessStatus(
            "API Key အလုပ်လုပ်ရန် အသင့်ဖြစ်နေပါပြီ။ Browser ထဲမှာ Save မလုပ်ထားပါ။",
            "success"
        );


        addLog(
            "✅ API Key active — not permanently saved.",
            "success"
        );

    }

}


// ======================================================
// SHOW / HIDE KEY
// ======================================================


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


// ======================================================
// CHANGE KEY
// ======================================================


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
            "API Key အသစ်ကို ထည့်ပြီး Save သို့မဟုတ် Test Key နှိပ်ပါ။",
            "info"
        );


        addLog(
            "✏️ API Key editing mode.",
            "info"
        );

    }
);


// ======================================================
// REMOVE KEY
// ======================================================


removeKeyBtn.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            STORAGE_KEY
        );


        apiKeyInput.value =
            "";


        rememberKey.checked =
            false;


        apiKeyInput.type =
            "password";


        toggleKeyBtn.textContent =
            "👁";


        setKeyStatus(
            "Removed",
            "error"
        );


        resetStatus();


        setProcessStatus(
            "API Key ကို Browser မှ ဖယ်ရှားပြီးပါပြီ။",
            "success"
        );


        addLog(
            "🗑 Saved API Key removed.",
            "success"
        );

    }
);


// ======================================================
// TEST API KEY
// ======================================================


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


        showError(
            "API Key ထည့်ပြီးမှ Test လုပ်ပါ။"
        );


        return;

    }


    testKeyBtn.disabled =
        true;


    resetStatus();


    setKeyStatus(
        "Testing",
        "loading"
    );


    setProcessBadge(
        "Testing",
        "loading"
    );


    setProgress(
        15,
        "API Key စစ်ဆေးနေပါသည်..."
    );


    addLog(
        "⏳ Connecting to Google Gemini API...",
        "info"
    );


    try{

        setProgress(
            40,
            "Gemini Server ကို ချိတ်ဆက်နေပါသည်..."
        );


        const response =
            await fetch(

                `${API_BASE}/models/${MODEL}`,

                {

                    method:
                        "GET",

                    headers: {

                        "x-goog-api-key":
                            key

                    }

                }

            );


        if(
            !response.ok
        ){

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


        addLog(
            `✅ Model ready: ${MODEL}`,
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


// ======================================================
// TEXT COUNTER
// ======================================================


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


// ======================================================
// PLAYER VOLUME
// ======================================================


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


// ======================================================
// EMOTION PROMPTS
// ======================================================


const EMOTIONS = {

    natural:
        "Speak naturally, clearly, smoothly, and conversationally.",


    happy:
        "Speak in a happy, cheerful, warm, positive, and energetic tone.",


    excited:
        "Speak with strong excitement, enthusiasm, energy, and expressive delivery.",


    calm:
        "Speak calmly, gently, softly, peacefully, and naturally.",


    serious:
        "Speak in a serious, confident, focused, and professional tone.",


    dramatic:
        "Speak dramatically like a cinematic narrator with emotional and expressive delivery.",


    sad:
        "Speak in a sad, emotional, gentle, and heartfelt tone.",


    angry:
        "Speak with controlled anger, intensity, and strong emotion while keeping every word clear.",


    friendly:
        "Speak in a friendly, warm, welcoming, and conversational tone.",


    news:
        "Speak clearly, professionally, confidently, and evenly like a television news narrator.",


    story:
        "Speak like an engaging professional storyteller with expressive pacing and natural emotion.",


    whisper:
        "Speak softly in a gentle whisper while keeping every word understandable."

};


// ======================================================
// SPEED / PACE PROMPTS
// ======================================================


const PACES = {

    "0.5":
        "Speak at a very slow and relaxed pace.",


    "0.75":
        "Speak slowly and clearly.",


    "1":
        "Speak at a natural normal pace.",


    "1.25":
        "Speak slightly faster than normal while remaining natural.",


    "1.5":
        "Speak at a fast and energetic pace while keeping every word clear.",


    "2":
        "Speak very quickly while keeping the speech understandable.",


    "3":
        "Speak at an extremely fast pace while preserving clear pronunciation.",


    "4":
        "Speak as fast as naturally possible while keeping the words understandable."

};


// ======================================================
// GENERATE VOICE
// ======================================================


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



    // =========================
    // CHECK API KEY
    // =========================

    if(!key){

        resetStatus();


        setKeyStatus(
            "Missing",
            "error"
        );


        showError(
            "Gemini API Key မထည့်ရသေးပါ။"
        );


        addLog(
            "❌ API Key missing.",
            "error"
        );


        return;

    }



    // =========================
    // CHECK VOICE
    // =========================

    if(!voice){

        resetStatus();


        showError(
            "Gemini Voice တစ်ခုရွေးပါ။"
        );


        return;

    }



    // =========================
    // CHECK TEXT
    // =========================

    if(!text){

        resetStatus();


        showError(
            "အသံထုတ်ရန် စာသားမထည့်ရသေးပါ။"
        );


        addLog(
            "❌ Voice Script is empty.",
            "error"
        );


        return;

    }



    // =========================
    // PREPARE UI
    // =========================

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



    try{


        // =========================
        // STEP 1
        // =========================

        setProgress(
            10,
            "Input Data စစ်ဆေးနေပါသည်..."
        );


        addLog(
            "✅ API Key detected.",
            "success"
        );


        addLog(
            `✅ Voice: ${voice}`,
            "success"
        );


        addLog(
            `✅ Emotion: ${emotion}`,
            "success"
        );


        addLog(
            `✅ Speed: ${speed}x`,
            "success"
        );


        addLog(
            `✅ Text received: ${text.length.toLocaleString()} characters`,
            "success"
        );



        // =========================
        // STEP 2
        // =========================

        setProgress(
            22,
            "Gemini TTS Prompt ပြင်ဆင်နေပါသည်..."
        );


        const prompt =
            buildPrompt(
                text,
                emotion,
                speed
            );



        // =========================
        // STEP 3
        // =========================

        setProgress(
            38,
            "Google Gemini AI ကို Request ပို့နေပါသည်..."
        );


        addLog(
            "⏳ Sending TTS request...",
            "info"
        );



        const response =
            await fetch(

                `${API_BASE}/models/${MODEL}:generateContent`,

                {

                    method:
                        "POST",


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



        // =========================
        // API HTTP ERROR
        // =========================

        if(
            !response.ok
        ){

            throw await createApiError(
                response
            );

        }



        // =========================
        // STEP 4
        // =========================

        setProgress(
            60,
            "Gemini က Audio Generate လုပ်ပြီးပါပြီ..."
        );


        addLog(
            "✅ Gemini response received.",
            "success"
        );


        const data =
            await response.json();



        // =========================
        // FIND AUDIO
        // =========================

        const parts =
            data
            ?.candidates
            ?.[0]
            ?.content
            ?.parts
            ||
            [];


        const audioPart =
            parts.find(
                part =>
                    part
                    ?.inlineData
                    ?.data
            );



        if(
            !audioPart
            ||
            !audioPart.inlineData
            ||
            !audioPart.inlineData.data
        ){

            let finishReason =

                data
                ?.candidates
                ?.[0]
                ?.finishReason
                ||
                "Unknown";


            throw new Error(

                `Gemini က Audio Data ပြန်မပေးပါ။ Finish Reason: ${finishReason}`

            );

        }



        // =========================
        // STEP 5
        // =========================

        setProgress(
            74,
            "Audio Data ကို Browser Player အတွက် ပြောင်းနေပါသည်..."
        );


        const pcmBytes =
            base64ToUint8Array(

                audioPart.inlineData.data

            );



        if(
            pcmBytes.length
            ===
            0
        ){

            throw new Error(
                "Gemini Audio Data က Empty ဖြစ်နေပါသည်။"
            );

        }



        // Gemini PCM
        // 24kHz
        // Mono
        // 16-bit

        const wavBlob =
            createWavBlob(

                pcmBytes,

                24000,

                1,

                16

            );



        // =========================
        // REMOVE OLD AUDIO URL
        // =========================

        if(
            currentAudioURL
        ){

            URL.revokeObjectURL(
                currentAudioURL
            );

        }



        // =========================
        // NEW AUDIO URL
        // =========================

        currentAudioURL =
            URL.createObjectURL(
                wavBlob
            );



        // =========================
        // STEP 6
        // =========================

        setProgress(
            86,
            "Audio Player ပြင်ဆင်နေပါသည်..."
        );


        audioPlayer.src =
            currentAudioURL;


        audioPlayer.volume =
            Number(
                volumeSlider.value
            ) / 100;


        audioPlayer.playbackRate =
            1;


        audioPlayer.load();



        // =========================
        // OUTPUT INFO
        // =========================

        outputVoice.textContent =
            voice;


        outputEmotion.textContent =

            emotionSelect
            .selectedOptions[0]
            .textContent
            .trim();



        // =========================
        // DOWNLOAD
        // =========================

        downloadBtn.href =
            currentAudioURL;


        downloadBtn.download =
            createFileName(
                voice
            );



        // =========================
        // SHOW AUDIO
        // =========================

        audioOutput.classList.remove(
            "hidden"
        );



        // =========================
        // DRAW WAVE
        // =========================

        setProgress(
            94,
            "Waveform ဖန်တီးနေပါသည်..."
        );


        requestAnimationFrame(
            () => {

                drawWaveform(
                    pcmBytes
                );

            }
        );



        // =========================
        // COMPLETE
        // =========================

        setProgress(
            100,
            "✅ Voice Generation ပြီးဆုံးပါပြီ။"
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
            "🎧 Audio Player Ready.",
            "success"
        );


        addLog(
            "🌊 Waveform Ready.",
            "success"
        );


        addLog(
            "⬇️ Download Ready.",
            "success"
        );


        audioOutput.scrollIntoView({

            behavior:
                "smooth",

            block:
                "nearest"

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


// ======================================================
// BUILD GEMINI TTS PROMPT
// ======================================================


function buildPrompt(
    text,
    emotion,
    speed
){

    const emotionPrompt =

        EMOTIONS[
            emotion
        ]

        ||

        EMOTIONS.natural;


    const pacePrompt =

        PACES[
            speed
        ]

        ||

        PACES["1"];


    return `

# AUDIO PROFILE

Use the selected Gemini voice naturally.

# DIRECTOR'S NOTES

Emotion and style:
${emotionPrompt}

Pacing:
${pacePrompt}

# IMPORTANT INSTRUCTIONS

Read the transcript exactly as written.

Do not translate the transcript.

Do not summarize it.

Do not add new sentences.

Do not remove sentences.

Keep pronunciation clear and natural.

Maintain the requested emotion and pacing.

# TRANSCRIPT

${text}

`.trim();

}


// ======================================================
// BASE64 AUDIO -> UINT8 ARRAY
// ======================================================


function base64ToUint8Array(
    base64
){

    const binary =
        atob(
            base64
        );


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
            binary.charCodeAt(
                i
            );

    }


    return bytes;

}


// ======================================================
// PCM -> WAV
// ======================================================


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

                string.charCodeAt(
                    i
                )

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



    // RIFF HEADER

    writeString(
        0,
        "RIFF"
    );


    view.setUint32(

        4,

        36
        +
        pcmBytes.length,

        true

    );


    writeString(
        8,
        "WAVE"
    );


    // FORMAT

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


    // AUDIO DATA

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

        [
            buffer
        ],

        {

            type:
                "audio/wav"

        }

    );

}


// ======================================================
// DRAW WAVEFORM
// ======================================================


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
        width
        *
        ratio;


    waveform.height =
        height
        *
        ratio;


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

                pcmBytes.byteLength
                /
                2

            )

        );


    const center =
        height / 2;


    const bars =

        Math.max(

            40,

            Math.min(

                110,

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

                start
                +
                step,

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


            if(
                value > max
            ){

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
                width
                /
                bars
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


// ======================================================
// CREATE API ERROR
// ======================================================


async function createApiError(
    response
){

    let apiMessage =
        "";


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

    catch(error){

        apiMessage =
            response.statusText;

    }


    let friendlyMessage =
        "Gemini API Error ဖြစ်နေပါသည်။";


    switch(
        response.status
    ){


        case 400:

            friendlyMessage =
                "Request Setting မမှန်ပါ သို့မဟုတ် Voice / Model Request Error ဖြစ်နေပါသည်။";

            break;



        case 401:

            friendlyMessage =
                "API Key Authentication မအောင်မြင်ပါ။ API Key ကိုစစ်ပါ။";

            break;



        case 403:

            friendlyMessage =
                "ဒီ API Key မှာ Gemini API Permission မရှိပါ သို့မဟုတ် Access ပိတ်ထားပါသည်။";

            break;



        case 404:

            friendlyMessage =
                "Gemini TTS Model ကို မတွေ့ပါ။";

            break;



        case 429:

            friendlyMessage =
                "Gemini API Quota / Rate Limit ပြည့်နေပါသည်။";

            break;



        case 500:

        case 502:

        case 503:

            friendlyMessage =
                "Google Gemini Server ဘက်မှာ ယာယီ Error ဖြစ်နေပါသည်။";

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


// ======================================================
// ERROR HANDLER
// ======================================================


function handleError(
    error
){

    console.error(
        "VOICE ERROR:",
        error
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


    setProgress(
        100,
        "❌ Voice Generation မအောင်မြင်ပါ။"
    );


    setProcessBadge(
        "Error",
        "error"
    );


    statusHeadline.textContent =
        `❌ ${message}`;


    addLog(
        `❌ ${message}`,
        "error"
    );

}


// ======================================================
// SIMPLE ERROR
// ======================================================


function showError(
    message
){

    setProcessBadge(
        "Error",
        "error"
    );


    statusHeadline.textContent =
        `❌ ${message}`;


    addLog(
        `❌ ${message}`,
        "error"
    );

}


// ======================================================
// RESET STATUS
// ======================================================


function resetStatus(){

    progressBar.style.width =
        "0%";


    statusHeadline.textContent =
        "Generate Voice နှိပ်ရန် အသင့်ဖြစ်နေပါပြီ။";


    statusLog.innerHTML =
        "";


    setProcessBadge(
        "Ready",
        "neutral"
    );


    addLog(
        "ℹ️ System Ready",
        "info"
    );

}


// ======================================================
// PROGRESS
// ======================================================


function setProgress(
    percent,
    message
){

    progressBar.style.width =
        `${percent}%`;


    statusHeadline.textContent =
        message;

}


// ======================================================
// PROCESS STATUS
// ======================================================


function setProcessStatus(
    message,
    type = "info"
){

    statusHeadline.textContent =
        message;


    if(
        type === "success"
    ){

        setProcessBadge(
            "Ready",
            "success"
        );

    }

    else if(
        type === "error"
    ){

        setProcessBadge(
            "Error",
            "error"
        );

    }

    else{

        setProcessBadge(
            "Ready",
            "neutral"
        );

    }

}


// ======================================================
// PROCESS BADGE
// ======================================================


function setProcessBadge(
    text,
    type
){

    processBadge.textContent =
        text;


    processBadge.className =
        `status-badge ${type}`;

}


// ======================================================
// KEY BADGE
// ======================================================


function setKeyStatus(
    text,
    type
){

    keyStatusBadge.textContent =
        text;


    keyStatusBadge.className =
        `status-badge ${type}`;

}


// ======================================================
// ADD PROCESS LOG
// ======================================================


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


    if(
        type === "success"
    ){

        item.className =
            "success-log";

    }

    else if(
        type === "error"
    ){

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


// ======================================================
// DOWNLOAD FILE NAME
// ======================================================


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
