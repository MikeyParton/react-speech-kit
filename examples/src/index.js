import React from 'react';
import { render} from 'react-dom';
import SpeechSynthesisExample from './SpeechSynthesis';
import SpeechRecognitionExample from './SpeechRecognition';
import { GlobalStyles, Row, GitLink, Title } from './shared';
import gh from './images/github.png';

const App = () => (
  <div>
    <GlobalStyles />
    <Title>react-speech-kit 🎤</Title>
    <Row>
      <SpeechSynthesisExample />
      <SpeechRecognitionExample />
    </Row>
    <GitLink>
      <img src={gh} />
      <a href="https://github.com/MikeyParton/react-speech-kit">
        By MikeyParton
      </a>
    </GitLink>
  </div>
);

render(<App />, document.getElementById('root'));
