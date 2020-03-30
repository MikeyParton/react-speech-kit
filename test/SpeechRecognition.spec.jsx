import React from 'react';
import SpeechRecognition from '../src/SpeechRecognition';
import runTests from './shared/speechRecognitionTests';

const mockOnEnd = jest.fn();
const mockOnResult = jest.fn();
const mockOnError = jest.fn();
const TestComponent = () => null;
const Example = () => (
  <SpeechRecognition
    onEnd={mockOnEnd}
    onResult={mockOnResult}
    onError={mockOnError}
  >
    {props => <TestComponent {...props} />}
  </SpeechRecognition>
);

runTests({
  Example,
  TestComponent,
  mockOnResult,
  mockOnEnd,
  mockOnError
});
