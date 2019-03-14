import React from 'react';
import { mount } from 'enzyme';
import MockSynthesis from './mocks/MockSynthesis';
import MockUtterance from './mocks/MockUtterance';
import SpeechSynthesisExample from '../../examples/src/SpeechSynthesis';

jest.useFakeTimers();
const mockOnEnd = jest.fn();
window.speechSynthesis = MockSynthesis;
window.SpeechSynthesisUtterance = MockUtterance;

describe('SpeechSynthesis', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
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
    jest.advanceTimersByTime(250);
    expect(mockOnEnd.mock.calls.length).toBe(0);
    toggleButton.simulate('click');

    expect(MockSynthesis.cancel.mock.calls.length).toBe(1);
    expect(mockOnEnd.mock.calls.length).toBe(1);
  });
});
