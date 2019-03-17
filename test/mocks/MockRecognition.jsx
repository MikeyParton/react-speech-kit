class MockRecognition {
  constructor() {
    this.onresult = () => {};
    this.onend = () => {};
    this.start = () => {
      // By calling startMock with the current settings,
      // we can test that they were updated correctly
      MockRecognition.start({
        lang: this.lang,
        interimResults: this.interimResults
      });

      setTimeout(() => {
        this.onresult(MockRecognition.mockResult);
        this.onend();
      }, 500);
    };

    this.stop = () => {
      MockRecognition.stop();
      this.onend();
    };
  }
}

// The mocked instance function is exposed on the class
// so we can spy on it from the tests
MockRecognition.mockResult = { results: [[{ transcript: 'I hear you' }]] };
MockRecognition.start = jest.fn();
MockRecognition.stop = jest.fn();

export default MockRecognition;
