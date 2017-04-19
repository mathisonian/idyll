const React = require('react');
const IdyllComponent = require('idyll-component');
const Scale = require('d3-scale');

class Range extends IdyllComponent {
  constructor(props) {
    super(props);
    this.scale = Scale.scaleLog().range([props.min, props.max]);
  }

  handleChange(event) {
    this.updateProps({
      value: this.scale(+event.target.value)
    });
  }

  render() {
    const { value, min, max, step } = this.props;
    const logStep = 9 / ((max - min) / step);
    return (
      <input type="range" onChange={this.handleChange.bind(this)} value={this.scale.invert(value)} min={1} max={10} step={logStep} />
    );
  }
}

Range.defaultProps = {
  value: 0,
  min: 0,
  max: 1,
  step: 1
};

module.exports = Range;