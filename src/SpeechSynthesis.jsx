import {
  memo,
  useEffect,
  useRef,
  useState
} from 'react';

const SpeechSynthesis = (props) => {
  const {
    active,
    text,
    onUnsupported,
    onEnd,
    onVoicesLoaded,
    voice
  } = props;
  const [voices, setVoices] = useState(null);
  const [voiceOption, setVoiceOption] = useState(null);

  const getUtterance = () => {
    // Firefox requires won't repeat an utterance that has been
    // spoken, so we need to create a new instance each time
    const utterance = new window.SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.voice = voiceOption;
    if (onEnd) {
      utterance.onend = onEnd;
    }
    return utterance;
  }

  const processVoices = (voiceOptions) => {
    setVoices(voiceOptions);
    if (onVoicesLoaded) {
      onVoicesLoaded(voiceOptions);
    }
  }

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
  }

  useEffect(() => {
    if (!window.speechSynthesis) {
      if (onUnsupported) {
        onUnsupported();
      }
      return;
    }
    getVoices();
  }, []);

  // Change voice
  useEffect(() => {
    if (voices) {
      const voiceOption = voices.find(option => option.name === voice);
      setVoiceOption(voiceOption);
    }
  }, [voice, voices]);

  useEffect(() => {
    if (active) {
      window.speechSynthesis.speak(getUtterance());
    } else {
      window.speechSynthesis.cancel();
    }
  }, [active]);

  return null;
};

export default memo(SpeechSynthesis);
