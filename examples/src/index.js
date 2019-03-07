import React from 'react';
import { render} from 'react-dom';
import SpeechSynthesisExample from './SpeechSynthesis';
import SpeechRecognitionExample from './SpeechRecognition';

const App = () => (
  <div>
    <h1>react-speech-kit</h1>
    <SpeechSynthesisExample />
    <SpeechRecognitionExample />
  </div>
);

render(<App />, document.getElementById('root'));
