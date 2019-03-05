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

  const onStart = () => {
    console.log('start!');
  }

  const onEnd = () => {
    setActive(false);
  }

  return (
    <StyledExample>
      <h1>Speech Synthesis Example</h1>
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
        active={active}
        onEnd={onEnd}
        onStart={onStart}
      />
    </StyledExample>
  );
};

export default Example;
