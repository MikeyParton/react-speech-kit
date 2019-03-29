import React from 'react';
import useSpeechSynthesis from '../src/useSpeechSynthesis';
import runTests from './shared/speechSynthesisTests';

const mockOnEnd = jest.fn();
const TestComponent = () => null;
const Example = () => {
  const props = useSpeechSynthesis({ onEnd: mockOnEnd });
  return (
    <TestComponent {...props} />
  );
};

runTests({
  Example,
  TestComponent,
  mockOnEnd
});
