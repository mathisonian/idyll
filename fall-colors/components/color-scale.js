const React = require('react');
const chroma = require('chroma-js');

const width = 500;
const height = 50;

class ColorScale extends React.Component {
  render() {
    const { colors, domain, steps, mode, correctLightness, style } = this.props;
    const scale = chroma.scale(colors).domain(domain).mode(mode);
    if (correctLightness) {
      scale.correctLightness();
    }
    const domainSize = domain[domain.length - 1] - domain[0];
    const labelWidth = 50;
    const rectWidth = width - labelWidth;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} style={style || {}}>
        {
          Array(steps).fill().map((_, i) => {
            return (
              <rect
                key={i}
                x={labelWidth + i * rectWidth / steps}
                y={0}
                width={rectWidth / steps}
                height={height}
                fill={scale( i / steps * domainSize + domain[0])} />
            )
          })
        }
        <text x={5} y={height / 2 + 6}>{mode.toUpperCase()}</text>
      </svg>
    );
  }
}

ColorScale.defaultProps = {
  steps: 450,
  colors: ['#000', '#fff'],
  mode: 'rgb',
  domain: [0, 1],
  correctLightness: false
}

module.exports = ColorScale;
