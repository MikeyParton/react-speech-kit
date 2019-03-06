import React from 'react';
import { render} from 'react-dom';
import SpeechSynthesisExample from './SpeechSynthesis';
import SpeechRecognitionExample from './SpeechRecognition';

const App = () => (
  <div>
    <SpeechSynthesisExample />
    <SpeechRecognitionExample />
  </div>
);

render(<App />, document.getElementById('root'));
