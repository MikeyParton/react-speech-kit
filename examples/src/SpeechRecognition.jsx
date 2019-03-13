import React, { useState } from 'react';
import { SpeechRecognition } from '../../src';
import { Container } from './shared';

const languageOptions = [
  { label: 'English', value: 'en-AU' },
  { label: 'Spanish', value: 'es-CL' },
  { label: 'Persian', value: 'fa-IR' },
  { label: 'Cambodian', value: 'km-KH' },
];

const Example = () => {
  const [lang, setLang] = useState('en-AU');
  const [value, setValue] = useState('');

  const onEnd = () => {
    // You could do something here after listening has finished
  };

  const onResult = (result) => {
    setValue(result);
  };

  const changeLang = (event) => {
    setLang(event.target.value);
  };

  return (
    <Container>
      <form id="speech-recognition-form">
        <h2>Speech Recognition</h2>
        <SpeechRecognition
          onEnd={onEnd}
          onResult={onResult}
        >
          {({
            listen,
            listening,
            stop,
            supported
          }) => {
            // Guard against unsupported browser first
            if (!supported) {
              return (
                <p>Oh no, it looks like your browser doesn&#39;t support Speech Recognition.</p>
              );
            }

            const toggle = listening
              ? stop
              : () => listen({ lang });

            return (
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
                  value={lang}
                  onChange={changeLang}
                >
                  {languageOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
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
                <button type="button" onClick={toggle}>
                  {listening ? 'Stop' : 'Listen'}
                </button>
              </React.Fragment>
            );
          }}
        </SpeechRecognition>
      </form>
    </Container>
  );
};

export default Example;
