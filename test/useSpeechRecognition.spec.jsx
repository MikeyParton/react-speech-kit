import React from 'react';
import useSpeechRecognition from '../src/useSpeechRecognition';
import runTests from './shared/speechRecognitionTests';

const mockOnEnd = jest.fn();
const mockOnResult = jest.fn();
const mockOnError = jest.fn();
const TestComponent = () => null;
const Example = () => {
  const props = useSpeechRecognition({
    onResult: mockOnResult,
    onEnd: mockOnEnd,
    onError: mockOnError
  });

  return (
    <TestComponent {...props} />
  );
};

runTests({
  Example,
  TestComponent,
  mockOnResult,
  mockOnEnd,
  mockOnError
});
