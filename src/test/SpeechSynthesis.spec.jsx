import React from 'react';
import { mount } from 'enzyme';
import MockSynthesis from './mocks/MockSynthesis';
import MockUtterance from './mocks/MockUtterance';
import SpeechSynthesisExample from '../../examples/src/SpeechSynthesis';
import SpeechSynthesis from '../SpeechSynthesis';

jest.useFakeTimers();
const mockOnEnd = jest.fn();
window.speechSynthesis = MockSynthesis;
window.SpeechSynthesisUtterance = MockUtterance;

class TestComponent extends React.Component {
  cancel() {
    this.props.cancel();
  }

  speak() {
    const { speak, text, voice } = this.props;
    speak({ text, voice });
  }

  render() {
    return null;
  }
}

const Example = ({ onEnd }) => (
  <SpeechSynthesis onEnd={onEnd}>
    {props => <TestComponent {...props} />}
  </SpeechSynthesis>
);

describe('SpeechSynthesis', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  describe('when speechSynthesis is missing from the window', () => {
    window.speechSynthesis = undefined;
    const wrapper = mount(<Example onEnd={mockOnEnd} />);
    const testComponent = wrapper.find(TestComponent);

    it('passes supported false ', () => {
      expect(testComponent.props().supported).toBe(false);
    });
  });

  describe('when speechSynthesis is available', () => {
    window.speechSynthesis = MockSynthesis;
    window.SpeechSynthesisUtterance = MockUtterance;
    const wrapper = mount(<Example onEnd={mockOnEnd} />);
    const testComponent = wrapper.find(TestComponent);

    it('passes supported true ', () => {
      expect(testComponent.props().supported).toBe(true);
    });

    describe('calling the provided speak prop function', () => {
      testComponent.props().speak({
        text: 'Hello this is a test',
        voice: 'test voice'
      });
      expect(MockSynthesis.speak.mock.calls.length).toBe(1);
      const args = MockSynthesis.speak.mock.calls[0][0];
      expect(args.text).toEqual('Hello this is a test');
      expect(args.voice).toEqual('test voice');
    });
  });

  test('calling speak calls speak on the SpeechSynthesis', () => {
    const wrapper = mount(<SpeechSynthesisExample onEnd={mockOnEnd} />);
    wrapper.find('button').simulate('click');
    expect(MockSynthesis.speak.mock.calls.length).toBe(1);
  });

  test('the text prop is passed correctly to SpeechSynthesis', () => {
    const wrapper = mount(<SpeechSynthesisExample onEnd={mockOnEnd} />);
    wrapper.find('textarea').simulate('change', { target: { value: 'Hello' } });
    wrapper.find('button').simulate('click');
    expect(MockSynthesis.speak.mock.calls[0][0].text).toEqual('Hello');
  });

  test('the voice prop is passed correctly to SpeechSynthesis', () => {
    const wrapper = mount(<SpeechSynthesisExample />);
    wrapper.find('select').simulate('change', { target: { value: 0 } });
    wrapper.find('button').simulate('click');
    expect(MockSynthesis.speak.mock.calls[0][0].voice.voiceURI).toEqual('Karen');
  });

  test('once SpeechSynthesis is done speaking it calls the onEnd prop', () => {
    const wrapper = mount(<SpeechSynthesisExample onEnd={mockOnEnd} />);
    wrapper.find('button').simulate('click');
    jest.advanceTimersByTime(500);
    expect(mockOnEnd.mock.calls.length).toBe(1);
  });

  test('calling cancel before it finishes also calls the onEnd prop', () => {
    const wrapper = mount(<SpeechSynthesisExample onEnd={mockOnEnd} />);
    const toggleButton = wrapper.find('button');
    toggleButton.simulate('click');

    // At this point, we're only halfway through reading the text
    jest.advanceTimersByTime(250);
    expect(mockOnEnd.mock.calls.length).toBe(0);

    toggleButton.simulate('click');
    expect(MockSynthesis.cancel.mock.calls.length).toBe(1);
    expect(mockOnEnd.mock.calls.length).toBe(1);
  });
});
