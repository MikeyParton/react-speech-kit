import mockVoices from './mockVoices';

class MockSpeechSynthesis {
  static getVoices() {
    return mockVoices;
  }

  static reset() {
    // remove reference to current utterance
    this.utterance = undefined;
  }
}

MockSpeechSynthesis.speak = jest.fn((utterance) => {
  // Save a reference to the utterance, so we can call its
  // onend when it is cancelled
  MockSpeechSynthesis.utterance = utterance;
  // Let's pretend it takes 500ms to finish speaking
  setTimeout(() => {
    MockSpeechSynthesis.reset();
    utterance.onend();
  }, 500);
});

MockSpeechSynthesis.cancel = jest.fn(() => {
  if (MockSpeechSynthesis.utterance) {
    MockSpeechSynthesis.utterance.onend();
    MockSpeechSynthesis.reset();
  }
});

export default MockSpeechSynthesis;
