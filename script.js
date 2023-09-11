const apiKey = 'YOUR_OPENAI_API_KEY';
const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';

const textInput = document.getElementById('textInput');
const processTextButton = document.getElementById('processText');
const outputDiv = document.getElementById('output');

processTextButton.addEventListener('click', () => {
    const inputText = textInput.value;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            prompt: inputText,
            max_tokens: 50, // Adjust as needed
        }),
    })
        .then(response => response.json())
        .then(data => {
            const outputText = data.choices[0].text;
            outputDiv.innerText = outputText;
        })
        .catch(error => console.error('Error:', error));
});
