import React, { useState } from 'react';
import { SpeechSynthesis } from '../../src';
import { Container } from './shared';

const Example = () => {
  const [active, setActive] = useState(false);
  const [text, setText] = useState('I am a robot');
  const [voiceOptions, setVoiceOptions] = useState([]);
  const [voice, setVoice] = useState(null);
  const [unsupported, setUnsupported] = useState(false);

  const toggleActive = () => {
    setActive(!active);
  };

  const onStart = () => {};

  const onEnd = () => {
    setActive(false);
  };

  const onUnsupported = () => {
    setUnsupported(true);
  };

  return (
    <Container>
      <form>
        <h2>Speech Synthesis</h2>
        {unsupported
          ? <p>Oh no, it looks like your browser doesn&#39;t support Speech Synthesis.</p>
          : (
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
                <option disabled selected value>-- select a voice --</option>
                {voiceOptions.map(option => (
                  <option key={option.voiceURI} value={option.voiceURI}>
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
              <button type="button" onClick={toggleActive}>
                {active ? 'Stop' : 'Speak'}
              </button>
              <SpeechSynthesis
                text={text}
                voiceURI={voice}
                active={active}
                onEnd={onEnd}
                onStart={onStart}
                onVoicesLoaded={setVoiceOptions}
                onUnsupported={onUnsupported}
              />
            </React.Fragment>
          )
        }
      </form>
    </Container>
  );
};

export default Example;
