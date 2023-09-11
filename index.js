const record = require("node-record-lpcm16");
const { TextEncoder, TextDecoder } = require("util");
const { Readable, Writable } = require("stream");
const { Transform } = require("stream");
const openai = require("openai");

openai.prompt(model, prompt, {
  n: 1,
  max_tokens: 2048,
  temperature: 0.7
}).then(function(response) {
  console.log(response.choices[0].text);
}).catch(function(err) {
  console.error(err);
});

const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const transcribeButton = document.getElementById("transcribe-button");

let recording = false;
let transcribing = false;

const encoding = "LINEAR16";
const sampleRateHertz = 16000;
const languageCode = "en-US";

startButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
transcribeButton.addEventListener("click", transcribeAudio);

const transcribe = async (audioBytes) => {
  const response = await speech.longRunningRecognize({
    config: {
      encoding: encoding,
      sampleRateHertz: sampleRateHertz,
      languageCode: languageCode
    },
    audio: {
      content: audioBytes.toString("base64")
    }
  });
  return response;
};

async function transcribeAudio() {
  if (!recording) {
    return;
  }
  if (transcribing) {
    return;
  }
  transcribing = true;
  const transcribeResponse = await transcribe(audioBytes);
  console.log(transcribeResponse);
  transcribing = false;
}

function startRecording() {
  recording = true;
  audioBytes = [];
  const audioStream = record.start({
    sampleRateHertz: sampleRateHertz,
    threshold: 0,
    verbose: false,
    recordProgram: "arecord",
    silence: "10.0"
  });
  const dataStream = new Transform({
    transform: function(chunk, encoding, callback) {
      audioBytes.push(chunk);
      callback(null, chunk);
    }
  });
  audioStream.pipe(dataStream);
}

function stopRecording() {
  recording = false;
  record.stop();
}
