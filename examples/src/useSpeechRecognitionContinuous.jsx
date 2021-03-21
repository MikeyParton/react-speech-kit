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
  { label: 'Svenska - Swedish', value: 'sv-SE' },
];

const Example = () => {
  const [lang, setLang] = useState('en-AU');
  const [final, setFinal] = useState('');
  const [interim, setInterim] = useState('');
  const [blocked, setBlocked] = useState(false);

  const onEnd = () => {
    setFinal(prevState => `${prevState}${interim} `);
    setInterim('');
  };

  const onResult = (_, finalTranscript, interimTranscript) => {
    setInterim(interimTranscript);
    setFinal(prevState => `${prevState}${finalTranscript}`);
  };

  const changeLang = (event) => {
    setLang(event.target.value);
  };

  const onError = (event) => {
    if (event.error === 'not-allowed') {
      setBlocked(true);
    }
  };

  const { listen, listening, stop, supported } = useSpeechRecognition({
    onResult,
    onEnd,
    onError,
  });

  const toggle = listening
    ? stop
    : () => {
        setBlocked(false);
        listen({
          continuous: true,
          nonStop: false,
          lang,
        });
      };

  return (
    <Container>
      <form id="continuous-recognition-form">
        <h2>Continuous Recognition</h2>
        {!supported && (
          <p>
            Oh no, it looks like your browser doesn&#39;t support Speech
            Recognition.
          </p>
        )}
        {supported && (
          <React.Fragment>
            <p>
              {`Click 'Listen' and start speaking.
               SpeechRecognition will provide a transcript of what you are saying.`}
            </p>
            <label htmlFor="lang">Language</label>
            <select
              form="speech-recognition-form"
              id="lang"
              value={lang}
              onChange={changeLang}
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <label>Transcript</label>
            <div className="textarea">
              {final && <span className="final">{final}</span>}
              {interim && <span className="interim">{interim}</span>}
            </div>
            <button disabled={blocked} type="button" onClick={toggle}>
              {listening ? 'Stop' : 'Listen'}
            </button>
            {blocked && (
              <p style={{ color: 'red' }}>
                The microphone is blocked for this site in your browser.
              </p>
            )}
          </React.Fragment>
        )}
      </form>
    </Container>
  );
};

export default Example;
