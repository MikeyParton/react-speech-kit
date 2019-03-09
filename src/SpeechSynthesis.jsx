import {
  memo,
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  active: PropTypes.bool.isRequired,
  interimResults: PropTypes.bool,
  lang: PropTypes.string,
  onEnd: PropTypes.func,
  onResult: PropTypes.func,
  onUnsupported: PropTypes.func
};

const defaultProps = {
  voiceURI: '',
  onEnd: () => {},
  onResult: () => {},
  onUnsupported: () => {}
};

const SpeechSynthesis = (props) => {
  const {
    active,
    text,
    onUnsupported,
    onEnd,
    onVoicesLoaded,
    voiceURI
  } = props;
  const [voices, setVoices] = useState(null);
  const [voice, setVoice] = useState(null);

  const getUtterance = () => {
    // Firefox requires won't repeat an utterance that has been
    // spoken, so we need to create a new instance each time
    const utterance = new window.SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.voice = voice;
    utterance.onend = onEnd;
    return utterance;
  };

  const processVoices = (voiceOptions) => {
    setVoices(voiceOptions);
    onVoicesLoaded(voiceOptions);
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

  useEffect(() => {
    if (!window.speechSynthesis) {
      onUnsupported();
      return;
    }
    getVoices();
  }, []);

  // Change voice
  useEffect(() => {
    if (voices) {
      debugger
      const newVoice = voices.find(option => option.voiceURI === voiceURI);
      setVoice(newVoice);
    }
  }, [voiceURI, voices]);

  useEffect(() => {
    if (active) {
      window.speechSynthesis.speak(getUtterance());
    } else {
      window.speechSynthesis.cancel();
    }
  }, [active]);

  return null;
};

SpeechSynthesis.propTypes = propTypes;
SpeechSynthesis.defaultProps = defaultProps;

export default memo(SpeechSynthesis);
