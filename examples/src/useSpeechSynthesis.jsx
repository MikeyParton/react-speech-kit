import React, { useState } from 'react';
import { useSpeechSynthesis } from '../../src';
import { Container } from './shared';

const Example = () => {
  const [text, setText] = useState('I am a robot');
  const [voiceIndex, setVoiceIndex] = useState(null);
  const onEnd = () => {
    // You could do something here after speaking has finished
  };
  const {
    speak,
    cancel,
    speaking,
    supported,
    voices
  } = useSpeechSynthesis({ onEnd });

  const voice = voices[voiceIndex] || null;

  return (
    <Container>
      <form>
        <h2>Speech Synthesis</h2>
        { !supported && (
          <p>Oh no, it looks like your browser doesn&#39;t support Speech Synthesis.</p>
        )}
        {supported && (
          <React.Fragment>
            <p>
              {`Type a message below then click 'Speak'
                and SpeechSynthesis will read it out.`}
            </p>
            <label htmlFor="voice">
              Voice
            </label>
            <select
              id="voice"
              name="voice"
              value={voiceIndex || ''}
              onChange={(event) => { setVoiceIndex(event.target.value); }}
            >
              <option value="">Default</option>
              {voices.map((option, index) => (
                <option key={option.voiceURI} value={index}>
                  {`${option.lang} - ${option.name}`}
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
              onChange={(event) => { setText(event.target.value); }}
            />
            { speaking
              ? (
                <button type="button" onClick={cancel}>
                  Stop
                </button>
              ) : (
                <button type="button" onClick={() => speak({ text, voice })}>
                  Speak
                </button>
              )
            }
          </React.Fragment>
        )}
      </form>
    </Container>
  );
};

export default Example;
