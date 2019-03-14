import mockVoices from './mockVoices';

class MockSpeechSynthesis {
  static getVoices() {
    return mockVoices;
  }
}

MockSpeechSynthesis.speak = jest.fn((utterance) => {
  // Save a reference to the utterance, so we can call its
  // onend when it is cancelled
  MockSpeechSynthesis.utterance = utterance;
  // Let's pretend it takes 500ms to finish speaking
  setTimeout(utterance.onend, 500);
});

MockSpeechSynthesis.cancel = jest.fn(() => {
  MockSpeechSynthesis.utterance.onend();
});

export default MockSpeechSynthesis;
