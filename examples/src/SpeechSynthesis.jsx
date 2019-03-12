import React, { useState } from 'react';
import { SpeechSynthesis } from '../../src';
import { Container } from './shared';

const Example = () => {
  const [text, setText] = useState('I am a robot');
  const [voice, setVoice] = useState("");

  const onEnd = () => {
    console.log('done!')
  };

  return (
    <Container>
      <form>
        <h2>Speech Synthesis</h2>
        <SpeechSynthesis>
          {({ speak, cancel, speaking, supported, voices }) => {
            if (!supported) return (
              <p>Oh no, it looks like your browser doesn&#39;t support Speech Synthesis.</p>
            );

            return (
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
                  value={voice}
                  onChange={(event) => { setVoice(event.target.value); }}
                >
                  <option value="">Default</option>
                  {voices.map(option => (
                    <option key={option.voiceURI} value={option}>
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
            )
          }}
        </SpeechSynthesis>
      </form>
    </Container>
  );
};

export default Example;
