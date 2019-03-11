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

  const onEnd = () => {};

  const onResult = (result) => {
    setValue(result);
  };

  const onUnsupported = () => {
    setUnsupported(true);
  };

  const changeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <Container>
      <form id="speech-recognition-form">
        <h2>Speech Recognition</h2>
        {unsupported
          ? <p>Oh no, it looks like your browser doesn&#39;t support Speech Recognition.</p>
          : (
            <React.Fragment>
              <p>
                {`Click 'Listen' and start speaking.
                 SpeechRecognition will provide a transcript of what you are saying.`
                }
              </p>
              <label htmlFor="language">
                Language
              </label>
              <select
                form="speech-recognition-form"
                id="language"
                value={language}
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
              <button type="button" onClick={toggleActive}>
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
          )
        }
      </form>
    </Container>
  );
};

export default Example;
