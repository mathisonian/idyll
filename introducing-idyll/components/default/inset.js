const React = require('react');
const IdyllComponent = require('idyll-component');

class Inset extends IdyllComponent {
  render() {
    return (
      <div className="inset">
        {this.props.children}
      </div>
    );
  }
}

module.exports = Inset;