import React, { useState } from 'react';
import { SpeechRecognition } from '../../src';
import { Container } from './shared';

const Example = () => {
  const [active, setActive] = useState(false);
  const [language, setLanguage] = useState('en-AU');
  const [value, setValue] = useState('');

  const toggleActive = () => {
    setActive(!active);
  };

  const onEnd = () => {
    console.log('end baby');
  }

  const onResult = (result) => {
    setValue(result);
  }

  const changeLanguage = (event) => {
    setLanguage(event.target.value);
  }

  return (
    <Container>
      <h2>Speech Recognition Example</h2>
      <p>
        Click 'Listen' and start speaking. SpeechRecognition will provide a transcript of what you are saying.
      </p>
      <select value={language} name="language" onChange={changeLanguage}>
        <option value="en-AU">English</option>
        <option value="es-CL">Spanish</option>
        <option value="fa-IR">Persian</option>
        <option value="km-KH">Cambodian</option>
      </select>
      <textarea
        value={value}
        rows={3}
        disabled
      />
      <button onClick={toggleActive}>
        {active ? 'Stop' : 'Listen'}
      </button>
      <SpeechRecognition
        lang={language}
        onEnd={onEnd}
        onResult={onResult}
        active={active}
      />
    </Container>
  );
}

export default Example;
