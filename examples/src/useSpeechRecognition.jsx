import React, { useState } from 'react';
import { useSpeechRecognition } from '../../src';
import { Container } from './shared';

const languageOptions = [
  { label: 'Cambodian', value: 'km-KH' },
  { label: 'Deutsch', value: 'de-DE' },
  { label: 'English', value: 'en-AU' },
  { label: 'Farsi', value: 'fa-IR' },
  { label: 'Français', value: 'fr-FR' },
  { label: 'Italiano', value: 'it-IT' },
  { label: '普通话 (中国大陆) - Mandarin', value: 'zh' },
  { label: 'Portuguese', value: 'pt-BR' },
  { label: 'Español', value: 'es-MX' },
  { label: 'Svenska - Swedish', value: 'sv-SE' }
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

  const onError = (event) => {
    if(event.error === "not-allowed") {
      console.log("Browser blocked microphone for this site");
    }
  }

  const {
    listen,
    listening,
    stop,
    supported
  } = useSpeechRecognition({ onResult, onEnd, onError });

  const toggle = listening
    ? stop
    : () => listen({ lang });

  return (
    <Container>
      <form id="speech-recognition-form">
        <h2>Speech Recognition</h2>
        {!supported && (
          <p>Oh no, it looks like your browser doesn&#39;t support Speech Recognition.</p>
        )}
        {supported && (
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
        )}
      </form>
    </Container>
  );
};

export default Example;
