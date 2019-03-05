import React from 'react';
import { render} from 'react-dom';
import SpeechSynthesisExample from './SpeechSynthesis';

const App = () => (
  <div>
    <SpeechSynthesisExample />
  </div>
);

render(<App />, document.getElementById('root'));
