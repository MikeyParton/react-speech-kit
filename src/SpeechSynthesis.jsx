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
    onEnd,
    onBrowserNotSupported
  } = props;
  const [started, setStarted] = useState(false);

  const utterance = useRef();

  useEffect(() => {
    if (!window.speechSynthesis) {
      if (onBrowserNotSupported) {
        onBrowserNotSupported();
      }
      return;
    }
  }, []);

  useEffect(() => {
    if (active) {
      utterance.current = new SpeechSynthesisUtterance(text);
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
