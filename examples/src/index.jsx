import React from 'react';
import { render } from 'react-dom';
import SpeechSynthesisExample from './useSpeechSynthesis';
import SpeechRecognitionExample from './useSpeechRecognition';
import { GlobalStyles, Row, GitLink, Title } from './shared';
import gh from './images/github.png';

const App = () => (
  <div>
    <GlobalStyles />
    <Title>
      {'react-speech-kit '}
      <span role="img" aria-label="microphone">
        🎤
      </span>
    </Title>
    <Row>
      <SpeechSynthesisExample />
      <SpeechRecognitionExample />
    </Row>
    <GitLink>
      <img alt="Github" src={gh} />
      <a href="https://github.com/MikeyParton/react-speech-kit">
        By MikeyParton
      </a>
    </GitLink>
  </div>
);

render(<App />, document.getElementById('root'));
