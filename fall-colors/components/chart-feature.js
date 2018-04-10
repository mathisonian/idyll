const React = require('react');
const chroma = require('chroma-js');

const width = 1200;
const height = 900;

class ChartFeature extends React.Component {
  render() {
    const { colors, domain, steps, mode, correctLightness, style } = this.props;
    const scale = chroma.scale(colors).domain(domain).mode(mode);

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

ChartFeature.defaultProps = {
  steps: 120,
  colors: ['#000', '#fff'],
  mode: 'rgb',
  domain: [0, 1]
}

module.exports = ChartFeature;
