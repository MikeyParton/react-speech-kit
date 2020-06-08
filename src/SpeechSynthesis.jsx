import {
  memo,
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.func.isRequired,
  onEnd: PropTypes.func
};

const defaultProps = {
  onEnd: () => {}
};

const SpeechSynthesis = (props) => {
  const { onEnd, children } = props;
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const supported = !!window.speechSynthesis;

  const processVoices = (voiceOptions) => {
    setVoices(voiceOptions);
  };

  const getVoices = () => {
    // Firefox seems to have voices upfront and never calls the
    // voiceschanged event
    let voiceOptions = window.speechSynthesis.getVoices();
    if (voiceOptions.length > 0) {
      processVoices(voiceOptions);
      return;
    }

    window.speechSynthesis.onvoiceschanged = (event) => {
      voiceOptions = event.target.getVoices();
      processVoices(voiceOptions);
    };
  };

  const handleEnd = () => {
    setSpeaking(false);
    onEnd();
  };

  useEffect(() => {
    if (supported) {
      getVoices();
    }
  }, []);

  const speak = (args = {}) => {
    const {
      voice = null, text = '', rate = 1, pitch = 1, volume = 1
    } = args;
    setSpeaking(true);
    // Firefox won't repeat an utterance that has been
    // spoken, so we need to create a new instance each time
    const utterance = new window.SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.voice = voice;
    utterance.onend = handleEnd;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    window.speechSynthesis.speak(utterance);
  };

  const cancel = () => {
    setSpeaking(false);
    window.speechSynthesis.cancel();
  };

  return children({
    supported,
    speak,
    speaking,
    cancel,
    voices
  });
};

SpeechSynthesis.propTypes = propTypes;
SpeechSynthesis.defaultProps = defaultProps;

export default memo(SpeechSynthesis);
