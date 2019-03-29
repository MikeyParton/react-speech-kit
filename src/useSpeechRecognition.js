import {
  useRef,
  useEffect,
  useState
} from 'react';

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const useSpeechRecognition = (props = {}) => {
  const {
    onEnd = () => {},
    onResult = () => {}
  } = props;
  const recognition = useRef(null);
  const [listening, setListening] = useState(false);
  const supported = !!window.SpeechRecognition;

  const processResult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    onResult(transcript);
  };

  const listen = (args = {}) => {
    if (listening) return;
    const { lang = '', interimResults = true } = args;
    setListening(true);
    recognition.current.lang = lang;
    recognition.current.interimResults = interimResults;
    recognition.current.onresult = processResult;
    // SpeechRecognition stops automatically after inactivity
    // We want it to keep going until we tell it to stop
    recognition.current.onend = () => recognition.current.start();
    recognition.current.start();
  };

  const stop = () => {
    if (!listening) return;
    recognition.current.onresult = () => {};
    recognition.current.onend = () => {};
    setListening(false);
    recognition.current.stop();
    onEnd();
  };

  useEffect(() => {
    if (!supported) return;
    recognition.current = new window.SpeechRecognition();
  }, []);

  return {
    listen,
    listening,
    stop,
    supported
  };
};

export default useSpeechRecognition;
