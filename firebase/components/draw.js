const React = require('react');
const IdyllComponent = require('idyll-component');

const randomColor = () => {
  const rgb = () => Math.round(Math.random() * 255);
  return `rgba(${rgb()}, ${rgb()}, ${rgb()}, ${Math.random()})`
}

const generateColors = (n) => {
  return Array(n).fill(0).map((_, i) => {
    return Array(n).fill(0).map((_, j) => {
      return randomColor();
    });
  });
}

class DrawComponent extends IdyllComponent {

  handleClick(j, i) {
    return () => {
      console.log(this.props.inputColor);
      let data = {};
      data[i] = this.props.inputColor;
      this.props.database.child(`pixels/${j}`).update(data, response => {
        console.log(response);
      });
    }
  }

  render() {
    const n = 50;
    const size = 50;
    const pixels = this.props.pixels;
    if (!pixels) {
      return null;
    }
    return (

      <svg viewBox={`0 0 ${n * size} ${n * size}`} style={{ width: '100%', height: 'auto' }}>
        {
          Array(n).fill(0).map((_, i) => {
            return Array(n).fill(0).map((_, j) => {
              return <rect x={j * size} y={i * size} width={size} height={size} fill={pixels[j][i]} onClick={this.handleClick(j, i)} />
            })
          })
        }
      </svg>
    );
  }
}

module.exports = DrawComponent;

