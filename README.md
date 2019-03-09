# react-speech-kit 🎤
React components for in-browser Speech Recognition and Speech Synthesis.
[Demo here](https://mikeyparton.github.io/react-speech-kit/)

## SpeechSynthesis
A react wrapper for the browser's [SpeechSynthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis).

### Props
- text: String (required)
- active: Boolean (required)
- voice: String
- onUnsupported: Function
- onStart: Function
- onEnd: Function
- onVoicesLoaded: Function

## SpeechRecognition
A react wrapper for the browser's [SpeechRecognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition).

### Props
- active: Boolean (required)
- voice: String
- onUnsupported: Function
- onResult: Function
- onEnd: Function
