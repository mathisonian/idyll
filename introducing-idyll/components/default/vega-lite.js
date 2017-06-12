const React = require('react');
const IdyllComponent = require('idyll-component');
const VL = require('react-vega-lite').default;
const deepEqual = require('deep-equal');

class VegaLite extends IdyllComponent {

  shouldComponentUpdate(nextProps) {
    return !deepEqual(nextProps.spec, this.props.spec);
  }

  render() {
    const data = {
      values: this.props.data
    };
    return (
      <VL {...this.props} data={data} />
    );
  }
}

module.exports = VegaLite;
