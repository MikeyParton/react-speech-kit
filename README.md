# react-speech-kit 🎤&nbsp;&nbsp;&nbsp;&nbsp;[![CircleCI](https://circleci.com/gh/MikeyParton/react-speech-kit/tree/master.svg?style=shield)](https://circleci.com/gh/MikeyParton/react-speech-kit/tree/master) [![codecov](https://codecov.io/gh/MikeyParton/react-speech-kit/branch/master/graph/badge.svg)](https://codecov.io/gh/MikeyParton/react-speech-kit)
React components for in-browser Speech Recognition and Speech Synthesis.
[Demo here](https://mikeyparton.github.io/react-speech-kit/)

## Install
```bash
yarn add react-speech-kit
```

## Examples and Demo
A full example can be found [here](https://mikeyparton.github.io/react-speech-kit/). The source code is in the [examples directory](https://github.com/MikeyParton/react-speech-kit/tree/master/examples/src).

## SpeechSynthesis
A react wrapper for the browser's [SpeechSynthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis). At the bare minimum, you can provide some text and an active prop and SpeechSynthesis will read it out.

### Props
| Property       | Type     | Required | Description                                                       |
| :--------------|----------|----------|------------------------------------------------------------------ |
| active         |`boolean` | Yes      | When true SpeechSynthesis will start reading from the start of the text. When false                                            it will stop. 
| onEnd          |`function`| No       | Function to call when SpeechSynthesis finishes reading the text.
| onStart        |`function`| No       | Function to call when SpeechSynthesis starts reading the text.
| onUnsupported  |`function`| No       | Function to call if the browser doesn't support SpeechSynthesis. 
| onVoicesLoaded |`function`| No       | Function to call when SpeechSynthesis loads the available voices. Will pass an array                                          of voice options as an argument.
| text           |`string`  | Yes      | The text to read.
| voiceURI       |`string`  | No       | The voice to read with. Use the voiceURI of one of the options returned from                                                  onVoicesLoaded. If not provided, the browser's default voice will be used.

## SpeechRecognition
A react wrapper for the browser's [SpeechRecognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition).

### Props
| Property       | Type     | Required | Description                                                       |
| :--------------|----------|----------|------------------------------------------------------------------ |
| active         |`boolean` | Yes      | When true SpeechRecognition will start listening for input. 
| onEnd          |`function`| No       | Function to call when SpeechRecognition finishes listening.
| onResult       |`function`| No       | Function to call when SpeechRecognition starts listening. Will pass the current                                                transcript string as an argument.
| onUnsupported  |`function`| No       | Function called if the browser doesn't support SpeechRecognition. 
| lang           |`string`  | No       | The language the SpeechRecognition will try to interpret the input in. Use the                                                languageCode from this list of languages that Chrome supports ([here](https://cloud.google.com/speech-to-text/docs/languages)).
