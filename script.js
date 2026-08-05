document.addEventListener('DOMContentLoaded', () => {
    const apiKeyInput = document.getElementById('apiKey');
    const toggleApiKeyBtn = document.getElementById('toggleApiKey');
    const textInput = document.getElementById('textInput');
    const voiceSelect = document.getElementById('voiceSelect');
    const emotionSelect = document.getElementById('emotionSelect');
    const generateBtn = document.getElementById('generateBtn');
    const resultSection = document.getElementById('resultSection');
    const audioPlayer = document.getElementById('audioPlayer');

    // API Key ပုန်း/ဖော် လုပ်ဆောင်ချက်
    toggleApiKeyBtn.addEventListener('click', () => {
        const type = apiKeyInput.getAttribute('type') === 'password' ? 'text' : 'password';
        apiKeyInput.setAttribute('type', type);
        toggleApiKeyBtn.innerHTML = type === 'password' 
            ? '<i class="fa-solid fa-eye"></i>' 
            : '<i class="fa-solid fa-eye-slash"></i>';
    });

    // Generate Button နှိပ်သည့်အခါ
    generateBtn.addEventListener('click', async () => {
        const apiKey = apiKeyInput.value.trim();
        const text = textInput.value.trim();
        const voice = voiceSelect.value;
        const emotion = emotionSelect.value;

        if (!apiKey) {
            alert('ကျေးဇူးပြု၍ Google AI Studio API Key ထည့်သွင်းပေးပါ!');
            return;
        }

        if (!text) {
            alert('ကျေးဇူးပြု၍ စာသား ရေးပါ!');
            return;
        }

        generateBtn.disabled = true;
        generateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> အသံ ဖန်တီးနေသည်...';

        try {
            // Prompt ထဲသို့ ခံစားချက်ပါ လမ်းညွှန်ချက် ထည့်သွင်းခြင်း
            const emotionPrompt = `Read the following text with a ${emotion} tone and voice: "${text}"`;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: emotionPrompt }]
                    }],
                    generationConfig: {
                        responseMimeType: "audio/mp3",
                        speechConfig: {
                            voiceConfig: {
                                prebuiltVoiceConfig: {
                                    voiceName: voice
                                }
                            }
                        }
                    }
                })
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message || 'API Error ဖြစ်ပွားခဲ့ပါသည်');
            }

            // Audio Base64 Data စစ်ဆေးခြင်း
            const candidate = data.candidates?.[0];
            const audioData = candidate?.content?.parts?.[0]?.inlineData?.data;

            if (audioData) {
                audioPlayer.src = `data:audio/mp3;base64,${audioData}`;
                resultSection.style.display = 'block';
                audioPlayer.play();
            } else {
                alert('အသံ ထုတ်လုပ်၍ မရရှိပါ။ စာသား သို့မဟုတ် API Key ပြန်စစ်ပေးပါ။');
            }

        } catch (error) {
            console.error(error);
            alert('အမှားအယွင်း ရှိနေပါသည်: ' + error.message);
        } finally {
            generateBtn.disabled = false;
            generateBtn.innerHTML = '<i class="fa-solid fa-play"></i> အသံ ထုတ်လုပ်မည်';
        }
    });
});
