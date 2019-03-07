import React, { useState } from 'react';
import { SpeechSynthesis } from '../../src';
import { Container } from './shared';

const Example = () => {
  const [active, setActive] = useState(false);
  const [text, setText] = useState('I am a robot');
  const [delay, setDelay] = useState(0);
  const [voiceOptions, setVoiceOptions] = useState([]);
  const [voice, setVoice] = useState('Alex');
  const [supported, setSupported] = useState(true);

  const toggleActive = () => {
    setActive(!active);
  };

  const onStart = () => {
    console.log('start!');
  }

  const onEnd = () => {
    setActive(false);
  }

  const onBrowserNotSupported = () => {
    setSupported(false);
    console.log('aaah')
  }

  return (
    <Container>
      <h2>Speech Synthesis Example</h2>
      <p>
        Type something into the text input below, then click on 'Speak' and
        SpeechSynthesis will read your message.
      </p>
      {supported}
      <select
        value={voice}
        onChange={(event) => setVoice(event.target.value)}
      >
        {voiceOptions.map(option => (
          <option key={option.name} value={option.name}>
            {option.lang} - {option.name}
          </option>
        ))}
      </select>
      <textarea
        rows={3}
        value={text}
        onChange={() => setText(event.target.value)}
      />
      <button onClick={toggleActive}>
        {active ? 'Stop' : 'Speak'}
      </button>
      <SpeechSynthesis
        text={text}
        voice={voice}
        active={active}
        onEnd={onEnd}
        onStart={onStart}
        onVoicesLoaded={setVoiceOptions}
        onNotSupported={onBrowserNotSupported}
      />
    </Container>
  );
};

export default Example;
