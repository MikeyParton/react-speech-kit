import React, { useState } from 'react';
import { SpeechRecognition } from '../../src';
import { Container } from './shared';

const Example = () => {
  const [active, setActive] = useState(false);
  const [language, setLanguage] = useState('en-AU');
  const [value, setValue] = useState('');
  const [unsupported, setUnsupported] = useState(false);

  const toggleActive = () => {
    setActive(!active);
  };

  const onEnd = () => {
    console.log('end baby');
  }

  const onResult = (result) => {
    setValue(result);
  }

  const onUnsupported = () => {
    setUnsupported(true);
  }

  const changeLanguage = (event) => {
    setLanguage(event.target.value);
  }

  return (
    <Container>
      <h2>Speech Recognition Example</h2>
      {unsupported
        ? <p>Oh no, it looks like your browser doesn't support Speech Recognition.</p>
        : <React.Fragment>
            <p>Click 'Listen' and start speaking. SpeechRecognition will provide a transcript of what you are saying.</p>
            <label htmlFor="language">
              Language
            </label>
            <select
              id="language"
              value={language}
              name="language"
              onChange={changeLanguage}
            >
              <option value="en-AU">English</option>
              <option value="es-CL">Spanish</option>
              <option value="fa-IR">Persian</option>
              <option value="km-KH">Cambodian</option>
            </select>
            <label htmlFor="transcript">
              Transcript
            </label>
            <textarea
              id="transcript"
              name="transcript"
              placeholder="Waiting to take notes ..."
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
              onUnsupported={onUnsupported}
              active={active}
            />
          </React.Fragment>
      }
    </Container>
  );
}

export default Example;
