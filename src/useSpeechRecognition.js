import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * Custom hook similar to useCallback, but for callbacks where the dependencies
 * change frequently. Ensures that references to state and props inside the
 * callback always get the latest values. Used to keep the `listen` and `stop`
 * functions in sync with the latest values of the `listening` and `supported`
 * state variables. See this issue for an example of why this is needed:
 *
 *   https://github.com/MikeyParton/react-speech-kit/issues/31
 *
 * Implementation taken from "How to read an often-changing value from
 * useCallback?" in the React hooks API reference:
 *
 *   https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
 */
const useEventCallback = (fn, dependencies) => {
  const ref = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback((args) => {
    const fn = ref.current;
    return fn(args);
  }, [ref]);
};

const useSpeechRecognition = (props = {}) => {
  const { onEnd = () => {}, onResult = () => {}, onError = () => {} } = props;
  const recognition = useRef(null);
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);

  const processResult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
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

  const listen = useEventCallback((args = {}) => {
    if (listening || !supported) return;
    const {
      lang = '',
      interimResults = true,
      continuous = false,
      maxAlternatives = 1,
      grammars,
    } = args;
    setListening(true);
    recognition.current.lang = lang;
    recognition.current.interimResults = interimResults;
    recognition.current.onresult = processResult;
    recognition.current.onerror = handleError;
    recognition.current.continuous = continuous;
    recognition.current.maxAlternatives = maxAlternatives;
    if (grammars) {
      recognition.current.grammars = grammars;
    }
    // SpeechRecognition stops automatically after inactivity
    // We want it to keep going until we tell it to stop
    recognition.current.onend = () => recognition.current.start();
    recognition.current.start();
  }, [listening, supported, recognition]);

  const stop = useEventCallback(() => {
    if (!listening || !supported) return;
    recognition.current.onresult = () => {};
    recognition.current.onend = () => {};
    recognition.current.onerror = () => {};
    setListening(false);
    recognition.current.stop();
    onEnd();
  }, [listening, supported, recognition, onEnd]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (window.SpeechRecognition) {
      setSupported(true);
      recognition.current = new window.SpeechRecognition();
    }
  }, []);

  return {
    listen,
    listening,
    stop,
    supported,
  };
};

export default useSpeechRecognition;
