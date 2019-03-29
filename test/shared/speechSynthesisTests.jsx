import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import MockSynthesis from '../mocks/MockSynthesis';
import MockUtterance from '../mocks/MockUtterance';

const speechSynthesisTests = ({
  Example,
  TestComponent,
  mockOnEnd
}) => {
  jest.useFakeTimers();

  describe('SpeechSynthesis', () => {
    let wrapper;

    beforeEach(() => {
      window.speechSynthesis = MockSynthesis;
      window.SpeechSynthesisUtterance = MockUtterance;
      MockSynthesis.reset();
      jest.clearAllTimers();
      jest.clearAllMocks();
      wrapper = mount(<Example />);
    });

    describe('initial props', () => {
      it('passes supported: true ', () => {
        expect(wrapper.find(TestComponent).props().supported).toBe(true);
      });

      it('passes speaking: false', () => {
        expect(wrapper.find(TestComponent).props().speaking).toBe(false);
      });

      describe('when window.speechSynthesis.getVoices returns voices immediately', () => {
        it('passes voices', () => {
          expect(wrapper.find(TestComponent).props().voices).toEqual(MockSynthesis.mockVoices);
        });
      });

      describe('when window.speechSynthesis.getVoices returns voices async', () => {
        beforeEach(() => {
          MockSynthesis.getVoices = () => {
            setTimeout(() => {
              MockSynthesis.getVoices = () => MockSynthesis.mockVoices;
              MockSynthesis.onvoiceschanged({ target: MockSynthesis });
            }, 500);
            return [];
          };

          wrapper = mount(<Example />);
        });

        it('passes voices: [] at first', () => {
          expect(wrapper.find(TestComponent).props().voices).toEqual([]);
        });

        it('passes voices when they load', () => {
          act(() => {
            jest.advanceTimersByTime(500);
          });
          wrapper.update();
          expect(wrapper.find(TestComponent).props().voices).toEqual(MockSynthesis.mockVoices);
        });
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

    describe('speak()', () => {
      let args;
      beforeEach(() => {
        act(() => {
          wrapper.find(TestComponent).props().speak(args);
        });
      });

      it('calls window.speechSynthesis.speak with default args', () => {
        expect(MockSynthesis.speak.mock.calls.length).toBe(1);
        const receivedArgs = MockSynthesis.speak.mock.calls[0][0];
        expect(receivedArgs.text).toEqual('');
        expect(receivedArgs.voice).toEqual(null);
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

      describe('passing args', () => {
        beforeAll(() => {
          args = {
            text: 'Hello this is a test',
            voice: 'test voice'
          };
        });

        it('calls window.speechSynthesis.speak with provided args', () => {
          const receivedArgs = MockSynthesis.speak.mock.calls[0][0];
          expect(receivedArgs.text).toEqual('Hello this is a test');
          expect(receivedArgs.voice).toEqual('test voice');
        });
      });
    });

    describe('cancel()', () => {
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
};

export default speechSynthesisTests;
