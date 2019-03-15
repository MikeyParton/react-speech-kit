import React from 'react';

class TestComponent extends React.Component {
  speak = () => {
    const { speak, text, voice } = this.props;
    speak({ text, voice });
  }

  cancel = () => {
    this.props.cancel();
  }

  render() {
    return null;
  }
}

export default TestComponent;
