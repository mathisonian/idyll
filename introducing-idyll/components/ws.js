const React = require('react');
const IdyllComponent = require('idyll-component');

class WS extends IdyllComponent {

  componentDidMount() {
    console.log('Component initialized');
    // Set interval to simulate an async call
    setInterval(() => {
      this.updateProps({
        data: Math.random()
      })
    }, 1000);
  }

  render() {
    return null;
  }
}

module.exports = WS;