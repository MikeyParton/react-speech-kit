import {
  memo,
  useRef,
  useEffect,
  useState
} from 'react';

const defaultSettings = {
  lang: 'en-US',
  interimResults: true
};

const Speak = (props) => {
  const recognition = useRef(null);
  const [started, setStarted] = useState(false);
  const {
    active,
    interimResults,
    lang,
    onUnsupported,
    onEnd,
    onResult
  } = props;

  const processResult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    if (onResult) {
      onResult(transcript);
    }
  };

  const start = () => {
    recognition.current.onresult = processResult;
    // SpeechRecognition stops automatically after inactivity
    // We want it to keep going until we tell it to stop
    recognition.current.onend = () => recognition.current.start();
    if (!started) {
      recognition.current.start();
      setStarted(true);
    }
  };

  const stop = () => {
    if (!started) return;
    recognition.current.onend = () => {};
    recognition.current.stop();
    setStarted(false);
    onEnd();
  };

  useEffect(() => {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!window.SpeechRecognition) {
      if (onUnsupported) {
        onUnsupported();
      }
      return;
    }

    recognition.current = new window.SpeechRecognition();
  }, []);

  // Start and stop listening
  useEffect(() => {
    if (!recognition.current) return;
    if (active) {
      start();
    } else {
      stop();
    }
  }, [active]);

  // Update language
  useEffect(() => {
    if (!recognition.current) return;
    recognition.current.lang = lang || defaultSettings.lang;
  }, [lang]);

  // Update interimResults
  useEffect(() => {
    if (!recognition.current) return;
    recognition.current.interimResults = interimResults || defaultSettings.interimResults;
  }, [interimResults]);

  return null;
};

const areEqual = (prevProps, nextProps) => ['active', 'lang', 'interimResults'].every(key => prevProps[key] === nextProps[key]);

export default memo(Speak, areEqual);
