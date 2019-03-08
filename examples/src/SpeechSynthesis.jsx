import React, { useState } from 'react';
import { SpeechSynthesis } from '../../src';
import { Container } from './shared';

const Example = () => {
  const [active, setActive] = useState(false);
  const [text, setText] = useState('I am a robot');
  const [delay, setDelay] = useState(0);
  const [voiceOptions, setVoiceOptions] = useState([]);
  const [voice, setVoice] = useState('Alex');
  const [unsupported, setUnsupported] = useState(false);

  const toggleActive = () => {
    setActive(!active);
  };

  const onStart = () => {
    console.log('start!');
  }

  const onEnd = () => {
    setActive(false);
  }

  const onUnsupported = () => {
    setUnsupported(true);
  }

  return (
    <Container>
      <h2>Speech Synthesis Example</h2>
      {unsupported
        ? <p>Oh no, it looks like your browser doesn't support Speech Synthesis.</p>
        : <React.Fragment>
            <p>
              Type a message below then click on 'Speak' and
              SpeechSynthesis will read it out.
            </p>
            <label htmlFor="voice">
              Voice
            </label>
            <select
              id="voice"
              name="voice"
              value={voice}
              onChange={(event) => setVoice(event.target.value)}
            >
              {voiceOptions.map(option => (
                <option key={option.name} value={option.name}>
                  {option.lang} - {option.name}
                </option>
              ))}
            </select>
            <label htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={text}
              onChange={(event) => setText(event.target.value)}
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
              onUnsupported={onUnsupported}
            />
          </React.Fragment>
      }
    </Container>
  );
};

export default Example;
