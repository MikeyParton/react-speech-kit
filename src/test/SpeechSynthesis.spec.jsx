import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import MockSynthesis from './mocks/MockSynthesis';
import MockUtterance from './mocks/MockUtterance';
import mockVoices from './mocks/mockVoices';
import SpeechSynthesis from '../SpeechSynthesis';

jest.useFakeTimers();
const mockOnEnd = jest.fn();
const TestComponent = () => null;
const Example = () => (
  <SpeechSynthesis onEnd={mockOnEnd}>
    {props => <TestComponent {...props} />}
  </SpeechSynthesis>
);

describe('SpeechSynthesis', () => {
  let wrapper;

  beforeEach(() => {
    MockSynthesis.reset();
    jest.clearAllTimers();
    jest.clearAllMocks();
    window.speechSynthesis = MockSynthesis;
    window.SpeechSynthesisUtterance = MockUtterance;
    wrapper = mount(<Example />);
  });

  describe('initial props', () => {
    it('passes supported: true ', () => {
      expect(wrapper.find(TestComponent).props().supported).toBe(true);
    });

    it('passes speaking: false', () => {
      expect(wrapper.find(TestComponent).props().speaking).toBe(false);
    });

    it('passes voices from window.speechSynthesis.getVoices', () => {
      expect(wrapper.find(TestComponent).props().voices).toEqual(mockVoices);
    });
  });

  describe('when speechSynthesis is unsupported', () => {
    beforeEach(() => {
      window.speechSynthesis = undefined;
      wrapper = mount(<Example />);
    });

    it('passes supported: false ', () => {
      expect(wrapper.find(TestComponent).props().supported).toBe(false);
    });
  });

  describe('calling the provided speak prop function', () => {
    beforeEach(() => {
      act(() => {
        wrapper.find(TestComponent).props().speak({
          text: 'Hello this is a test',
          voice: 'test voice'
        });
      });
    });

    it('calls window.speechSynthesis.speak with the correct text & voice args', () => {
      expect(MockSynthesis.speak.mock.calls.length).toBe(1);
      const args = MockSynthesis.speak.mock.calls[0][0];
      expect(args.text).toEqual('Hello this is a test');
      expect(args.voice).toEqual('test voice');
    });

    it('passes speaking: true', () => {
      wrapper.update();
      expect(wrapper.find(TestComponent).props().speaking).toBe(true);
    });

    it('passes speaking: false and calls the provided onEnd prop when finished', () => {
      act(() => {
        jest.advanceTimersByTime(500);
      });
      wrapper.update();
      expect(mockOnEnd.mock.calls.length).toBe(1);
      expect(wrapper.find(TestComponent).props().speaking).toBe(false);
    });
  });

  describe('calling the provided cancel prop function', () => {
    describe('while speaking', () => {
      it('calls window.speechSynthesis.cancel and the onEnd prop, then passes speaking: false', () => {
        act(() => {
          const testComponent = wrapper.find(TestComponent);
          testComponent.props().speak({
            text: 'Hello this is a test',
            voice: 'test voice'
          });
          jest.advanceTimersByTime(250);
          testComponent.props().cancel();
        });

        wrapper.update();
        expect(MockSynthesis.cancel.mock.calls.length).toBe(1);
        expect(mockOnEnd.mock.calls.length).toBe(1);
        expect(wrapper.find(TestComponent).props().speaking).toBe(false);
      });
    });

    describe('while not speaking', () => {
      it('calls window.speechSynthesis.cancel, but does not call the onEnd prop', () => {
        act(() => {
          wrapper.find(TestComponent).props().cancel();
        });
        expect(MockSynthesis.cancel.mock.calls.length).toBe(1);
        expect(mockOnEnd.mock.calls.length).toBe(0);
      });
    });
  });
});
