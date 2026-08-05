document.addEventListener('DOMContentLoaded', () => {
    const apiKeyInput = document.getElementById('apiKey');
    const toggleApiKeyBtn = document.getElementById('toggleApiKey');
    const textInput = document.getElementById('textInput');
    const voiceSelect = document.getElementById('voiceSelect');
    const emotionSelect = document.getElementById('emotionSelect');
    const generateBtn = document.getElementById('generateBtn');
    const audioPlayer = document.getElementById('audioPlayer');

    toggleApiKeyBtn.addEventListener('click', () => {
        const type = apiKeyInput.getAttribute('type') === 'password' ? 'text' : 'password';
        apiKeyInput.setAttribute('type', type);
        toggleApiKeyBtn.innerHTML = type === 'password' 
            ? '<i class="fa-solid fa-eye"></i>' 
            : '<i class="fa-solid fa-eye-slash"></i>';
    });

    generateBtn.addEventListener('click', async () => {
        const apiKey = apiKeyInput.value.trim();
        const text = textInput.value.trim();
        const voice = voiceSelect.value;
        const emotion = emotionSelect.value;

        if (!apiKey) {
            alert('ကျေးဇူးပြု၍ Gemini API Key ထည့်ပေးပါ!');
            return;
        }

        if (!text) {
            alert('ကျေးဇူးပြု၍ စကားပြောစေချင်သည့် စာသား ရေးပါ!');
            return;
        }

        generateBtn.disabled = true;
        generateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

        try {
            const promptText = `Say this text in ${emotion} emotion tone: "${text}"`;

            // Gemini REST API Audio Config
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: promptText }]
                    }],
                    generationConfig: {
                        responseModalities: ["AUDIO"],
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
                alert('API Error: ' + data.error.message);
                return;
            }

            const candidate = data.candidates?.[0];
            const inlineData = candidate?.content?.parts?.[0]?.inlineData;

            if (inlineData && inlineData.data) {
                const mimeType = inlineData.mimeType || 'audio/mp3';
                audioPlayer.src = `data:${mimeType};base64,${inlineData.data}`;
                audioPlayer.play();
            } else {
                alert('Gemini မှ အသံ Data ပြန်မပို့ပေးပါ။ API Key သို့မဟုတ် စာသားကို ပြန်စစ်ပေးပါ။');
            }

        } catch (error) {
            console.error('Fetch Error:', error);
            alert('ချိတ်ဆက်မှု အမှားဖြစ်ပေါ်နေပါသည်: ' + error.message);
        } finally {
            generateBtn.disabled = false;
            generateBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Generate Voice';
        }
    });
});
