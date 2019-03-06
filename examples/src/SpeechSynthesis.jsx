import React, { useState } from 'react';
import { SpeechSynthesis } from '../../src';
import styled from 'styled-components';

const StyledExample = styled.div`
  textarea {
    font-size: 16px;
    margin-bottom: 8px;
    width: 100%;
  }
`;

const Example = () => {
  const [active, setActive] = useState(false);
  const [text, setText] = useState('Press Speak below to hear me speak');
  const [delay, setDelay] = useState(0);
  const [voiceOptions, setVoiceOptions] = useState([]);
  const [voice, setVoice] = useState('Alex');

  const onStart = () => {
    console.log('start!');
  }

  const onEnd = () => {
    setActive(false);
  }

  return (
    <StyledExample>
      <h1>Speech Synthesis Example</h1>
      <p>
        Type something into the text input below, then click on 'Speak' and
        SpeechSynthesis will read your message.
      </p>
      <select
        value={voice}
        onChange={(event) => setVoice(event.target.value)}
      >
        {voiceOptions.map(option => (
          <option value={option.name}>
            {option.lang} - {option.name}
          </option>
        ))}
      </select>
      <textarea
        rows={3}
        value={text}
        onChange={() => setText(event.target.value)}
      />
      <label htmlFor="speak">
        Speak
      </label>
      <input
        type="checkbox"
        id="speak"
        name="speak"
        checked={active}
        onChange={(event) => setActive(event.target.checked)}
      />
      <SpeechSynthesis
        text={text}
        voice={voice}
        active={active}
        onEnd={onEnd}
        onStart={onStart}
        onVoicesLoaded={setVoiceOptions}
      />
    </StyledExample>
  );
};

export default Example;
