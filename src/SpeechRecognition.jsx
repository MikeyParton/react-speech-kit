import {
  memo,
  useRef,
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.func.isRequired,
  onEnd: PropTypes.func,
  onResult: PropTypes.func,
  onError: PropTypes.func
};

const defaultProps = {
  onEnd: () => {},
  onResult: () => {},
  onError: () => {}
};

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const SpeechRekognition = (props) => {
  const recognition = useRef(null);
  const [listening, setListening] = useState(false);
  const supported = !!window.SpeechRecognition;
  const {
    children,
    onEnd,
    onResult,
    onError
  } = props;

  const processResult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    onResult(transcript);
  };

  const handleError = (event) => {
    if (event.error === 'not-allowed') {
      recognition.current.onend = () => {};
      setListening(false);
    }
    onError(event);
  };

  const listen = (args = {}) => {
    if (listening) return;
    const {
      lang = '',
      interimResults = true
    } = args;
    setListening(true);
    recognition.current.lang = lang;
    recognition.current.interimResults = interimResults;
    recognition.current.onresult = processResult;
    recognition.current.onerror = handleError;
    // SpeechRecognition stops automatically after inactivity
    // We want it to keep going until we tell it to stop
    recognition.current.onend = () => recognition.current.start();
    recognition.current.start();
  };

  const stop = () => {
    if (!listening) return;
    setListening(false);
    recognition.current.onend = () => {};
    recognition.current.stop();
    onEnd();
  };

  useEffect(() => {
    if (!supported) return;
    recognition.current = new window.SpeechRecognition();
  }, []);

  return children({
    listen,
    listening,
    stop,
    supported
  });
};

SpeechRekognition.propTypes = propTypes;
SpeechRekognition.defaultProps = defaultProps;

export default memo(SpeechRekognition);
