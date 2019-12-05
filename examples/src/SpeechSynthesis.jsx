import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SpeechSynthesis } from '../../src';
import { Container } from './shared';

const propTypes = {
  onEnd: PropTypes.func
};

const defaultProps = {
  onEnd: () => {}
};

const Example = ({ onEnd }) => {
  const [text, setText] = useState('I am a robot');
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [voiceIndex, setVoiceIndex] = useState(null);

  const styleFlexRow = { display: 'flex', flexDirection: 'row' };
  const styleContainerRatePitch = { display: 'flex', flexDirection: 'column', marginBottom: 12 };

  return (
    <Container>
      <form>
        <h2>Speech Synthesis</h2>
        <SpeechSynthesis onEnd={onEnd}>
          {({
            speak,
            cancel,
            speaking,
            supported,
            voices
          }) => {
            // Guard against unsupported browser first
            if (!supported) {
              return (
                <p>Oh no, it looks like your browser doesn&#39;t support Speech Synthesis.</p>
              );
            }

            const voice = voices[voiceIndex] || null;

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
                <div style={styleContainerRatePitch}>
                  <div style={styleFlexRow}>
                    <label htmlFor="rate">Rate: </label>
                    <div className="rate-value">{rate}</div>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    defaultValue="1"
                    step="0.1"
                    id="rate"
                    onChange={(event) => {
                      setRate(event.target.value);
                    }}
                  />
                </div>
                <div style={styleContainerRatePitch}>
                  <div style={styleFlexRow}>
                    <label htmlFor="pitch">Pitch: </label>
                    <div className="pitch-value">{pitch}</div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    defaultValue="1"
                    step="0.1"
                    id="pitch"
                    onChange={(event) => {
                      setPitch(event.target.value);
                    }}
                  />
                </div>
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
            );
          }}
        </SpeechSynthesis>
      </form>
    </Container>
  );
};

Example.propTypes = propTypes;
Example.defaultProps = defaultProps;

export default Example;
