const React = require('react');

class CustomComponent extends React.Component {

  componentDidCatch(e) {
    console.log(e);
  }
  render() {
    const { hasError, updateProps, ...props } = this.props;
    return (
      <div className="inset" {...props} />
    );
  }
}

module.exports = CustomComponent;
