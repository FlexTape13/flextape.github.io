const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/engines/davinci/tokens';

// Speech to Text
const startRecordingButton = document.getElementById('startRecording');
const stopRecordingButton = document.getElementById('stopRecording');
const transcriptionDiv = document.getElementById('transcription');

let recognition;

startRecordingButton.addEventListener('click', () => {
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        transcriptionDiv.innerText = result;
    };

    recognition.start();
    startRecordingButton.disabled = true;
    stopRecordingButton.disabled = false;
});

stopRecordingButton.addEventListener('click', () => {
    recognition.stop();
    startRecordingButton.disabled = false;
    stopRecordingButton.disabled = true;
});

// Text to Speech
const textInput = document.getElementById('textInput');
const convertToSpeechButton = document.getElementById('convertToSpeech');
const audioPlayer = document.getElementById('audioPlayer');

convertToSpeechButton.addEventListener('click', () => {
    const text = textInput.value;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            prompt: `Convert the following text to speech: ${text}`,
            max_tokens: 50,
        }),
    })
        .then(response => response.json())
        .then(data => {
            const audioUrl = data.choices[0].text;
            audioPlayer.src = audioUrl;
            audioPlayer.play();
        })
        .catch(error => console.error('Error:', error));
});
