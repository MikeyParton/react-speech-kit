import {
  memo,
  useRef,
  useEffect
} from 'react';

const defaultSettings = {
  lang: 'en-US',
  interimResults: true,
};

const Speak = (props) => {
  const recognition = useRef(null);
  const {
    active,
    interimResults,
    lang,
    onBrowserNotSupported,
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

  // Start and stop listening
  useEffect(() => {
    if (!recognition.current) return;
    if (active) {
      recognition.current.onresult = processResult;
      // SpeechRecognition stops automatically after inactivity
      // We want it to keep going until we tell it to stop
      recognition.current.onend = () => recognition.current.start();
      try {
        recognition.current.start();
      } catch (e) {
        // Recognition has already started
      }
    } else {
      recognition.current.onend = () => {};
      try {
        recognition.current.stop();
        if (onEnd) {
          onEnd();
        }
      } catch (e) {
        // Recognition has already stopped
      }
    }
  }, [active]);

  useEffect(() => {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (window.SpeechRecognition) {
      if (onBrowserNotSupported) {
        onBrowserNotSupported();
      }
      return;
    }
    recognition.current = new window.SpeechRecognition();
  }, []);

  // Update language
  useEffect(() => {
    recognition.current.lang = lang || defaultSettings.lang;
  }, [lang]);

  // Update interimResults
  useEffect(() => {
    recognition.current.interimResults = interimResults || defaultSettings.interimResults;
  }, [interimResults]);

  return null;
};

const areEqual = (prevProps, nextProps) => ['active', 'lang', 'interimResults'].every(key => prevProps[key] === nextProps[key]);

export default memo(Speak, areEqual);
