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
    onBrowserNotSupported,
    onEnd,
    onVoicesLoaded,
    voice
  } = props;
  const [started, setStarted] = useState(false);
  const [voices, setVoices] = useState(null);
  const utterance = useRef();

  useEffect(() => {
    if (!window.speechSynthesis) {
      if (onBrowserNotSupported) {
        onBrowserNotSupported();
        return;
      }
    }
    utterance.current = new window.SpeechSynthesisUtterance();
    window.speechSynthesis.addEventListener('voiceschanged', (event) => {
      const voiceOptions = event.target.getVoices();
      setVoices(voiceOptions);
      if (onVoicesLoaded) {
        onVoicesLoaded(voiceOptions);
      }
    });
  }, []);

  // Change voice
  useEffect(() => {
    if (voices) {
      const voiceOption = voices.find(option => option.name === voice);
      utterance.current.voice = voiceOption;
    }
  }, [voice, voices]);

  // Change text
  useEffect(() => {
    utterance.current.text = text;
  }, [text]);

  useEffect(() => {
    if (active) {
      if (onEnd) {
        utterance.current.onend = onEnd;
      }
      setStarted(true);
      window.speechSynthesis.speak(utterance.current);
    } else {
      if (!started) return;
      setStarted(false);
      window.speechSynthesis.cancel();
    }
  }, [active]);

  return null;
};

export default memo(SpeechSynthesis);
