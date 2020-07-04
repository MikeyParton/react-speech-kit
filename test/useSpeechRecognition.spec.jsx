import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import MockRecognition from './mocks/MockRecognition';
import useSpeechRecognition from '../src/useSpeechRecognition';

describe('useSpeechRecognition', () => {
  let wrapper;
  jest.useFakeTimers();
  const mockOnEnd = jest.fn();
  const mockOnResult = jest.fn();
  const mockOnError = jest.fn();
  const TestComponent = () => null;
  const Example = () => {
    const props = useSpeechRecognition({
      onResult: mockOnResult,
      onEnd: mockOnEnd,
      onError: mockOnError,
    });

    return <TestComponent {...props} />;
  };

  // A test component with `listen` and `stop` in closures to test that they
  // reference the latest value of `listening`
  const ClosureExample = () => {
    const props = useSpeechRecognition({
      onResult: mockOnResult,
      onEnd: mockOnEnd,
      onError: mockOnError,
    });

    props.listenHandler = () => {
      setTimeout(() => props.listen(), 1000);
    };

    props.stopHandler = () => {
      setTimeout(() => props.stop(), 1000);
    };

    return <TestComponent {...props} />;
  };

  beforeEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
    window.SpeechRecognition = MockRecognition;
    wrapper = mount(<Example />);
  });

  describe('initial props', () => {
    it('passes supported: true ', () => {
      expect(wrapper.find(TestComponent).props().supported).toBe(true);
    });

    it('passes speaking: false', () => {
      expect(wrapper.find(TestComponent).props().listening).toBe(false);
    });
  });

  describe('when SpeechRecognition is unsupported', () => {
    beforeEach(() => {
      window.SpeechRecognition = undefined;
      wrapper = mount(<Example />);
    });

    it('passes supported: false ', () => {
      expect(wrapper.find(TestComponent).props().supported).toBe(false);
    });
  });

  describe('listen()', () => {
    let args;

    beforeEach(() => {
      act(() => {
        wrapper.find(TestComponent).props().listen(args);
      });
      wrapper.update();
    });

    it('calls speak on the window.speechSynthesis instance with default args', () => {
      expect(MockRecognition.start.mock.calls.length).toBe(1);
      const receivedArgs = MockRecognition.start.mock.calls[0][0];
      expect(receivedArgs.lang).toEqual('');
      expect(receivedArgs.interimResults).toBe(true);
    });

    it('passes listening: true', () => {
      expect(wrapper.find(TestComponent).props().listening).toBe(true);
    });

    it('calls the provided onResult prop with the transcript', () => {
      // MockRecognition gives result after 500ms
      jest.advanceTimersByTime(500);
      expect(mockOnResult.mock.calls.length).toBe(1);
      expect(mockOnResult.mock.calls[0][0]).toEqual('I hear you');
    });

    it('calls start again on the window.speechSynthesis instance if it tries to stop', () => {
      // MockRecognition tries to finish after 500ms
      jest.advanceTimersByTime(1000);
      expect(MockRecognition.start.mock.calls.length).toBe(3);
    });

    describe('passing args', () => {
      beforeAll(() => {
        args = {
          lang: 'en-US',
          interimResults: false,
        };
      });

      it('applies the args to the window.speechSynthesis instance', () => {
        const receivedArgs = MockRecognition.start.mock.calls[0][0];
        expect(receivedArgs.lang).toEqual('en-US');
        expect(receivedArgs.interimResults).toBe(false);
      });
    });

    describe('when the user blocks permission', () => {
      beforeAll(() => {
        MockRecognition.start = jest.fn(() => {
          throw new Error('not allowed');
        });
      });

      it('calls the onError function', () => {
        expect(mockOnError.mock.calls.length).toBe(1);
      });
    });

    describe('when already listening', () => {
      beforeEach(() => {
        wrapper.update();
        act(() => {
          wrapper.find(TestComponent).props().listen(args);
        });
      });

      it('does not call start on the window.speechSynthesis instance again', () => {
        expect(MockRecognition.start.mock.calls.length).toBe(1);
      });
    });

    describe('when already listening, in a closure', () => {
      it('does not call start on the window.speechSynthesis instance again', () => {
        jest.clearAllMocks();
        const wrapper = mount(<ClosureExample />);
        act(() => {
          wrapper.find(TestComponent).props().listen();
          wrapper.find(TestComponent).props().listenHandler();
        });

        wrapper.update();
        act(() => {
          jest.advanceTimersByTime(1000);
        });

        wrapper.update();
        expect(MockRecognition.start.mock.calls.length).toBe(1);
      });
    });
  });

  describe('stop()', () => {
    describe('while listening', () => {
      it('calls stop on the window.speechSynthesis instance and the provided onEnd prop, then passes listening: false', () => {
        act(() => {
          wrapper.find(TestComponent).props().listen();
        });

        wrapper.update();

        act(() => {
          wrapper.find(TestComponent).props().stop();
        });

        wrapper.update();
        expect(MockRecognition.stop.mock.calls.length).toBe(1);
        expect(mockOnEnd.mock.calls.length).toBe(1);
        expect(wrapper.find(TestComponent).props().listening).toBe(false);
      });
    });

    describe('while not listening', () => {
      it('does not call stop on the window.speechSynthesis instance or the provided onEnd prop', () => {
        act(() => {
          wrapper.find(TestComponent).props().stop();
        });

        expect(MockRecognition.stop.mock.calls.length).toBe(0);
        expect(mockOnEnd.mock.calls.length).toBe(0);
      });
    });

    describe('while listening, in a closure', () => {
      it('calls stop on the window.speechSynthesis instance and the provided onEnd prop, then passes listening: false', () => {

        const wrapper = mount(<ClosureExample />);
        act(() => {
          wrapper.find(TestComponent).props().listen();
          wrapper.find(TestComponent).props().stopHandler();
        });

        wrapper.update();

        act(() => {
          jest.advanceTimersByTime(1000);
        });

        wrapper.update();
        expect(MockRecognition.stop.mock.calls.length).toBe(1);
        expect(mockOnEnd.mock.calls.length).toBe(1);
        expect(wrapper.find(TestComponent).props().listening).toBe(false);
      });
    });
  });
});
