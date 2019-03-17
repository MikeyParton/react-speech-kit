class MockSynthesis {
  static getVoices() {
    return this.mockVoices;
  }

  static reset() {
    // remove reference to current utterance
    this.utterance = undefined;
  }
}

MockSynthesis.speak = jest.fn((utterance) => {
  // Save a reference to the utterance, so we can call its
  // onend when it is cancelled
  MockSynthesis.utterance = utterance;
  // Let's pretend it takes 500ms to finish speaking
  setTimeout(() => {
    MockSynthesis.reset();
    utterance.onend();
  }, 500);
});

MockSynthesis.cancel = jest.fn(() => {
  if (MockSynthesis.utterance) {
    MockSynthesis.utterance.onend();
    MockSynthesis.reset();
  }
});

MockSynthesis.mockVoices = [{
  default: true,
  lang: 'en-AU',
  localService: true,
  name: 'Karen',
  voiceURI: 'Karen'
}];

export default MockSynthesis;
