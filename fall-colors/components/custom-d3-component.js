const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const chroma = require('chroma-js');

const width = 1000;
const height = 800;

class CustomD3Component extends D3Component {

  initialize(node, props) {
    const svg = this.svg = d3.select(node).append('svg');
    svg.attr('viewBox', `0 0 ${width} ${height}`)
      .style('width', '100%')
      .style('height', 'auto');

    this.timeouts = [];
  }

  update(props) {
    const padding = 10;
    this.scale = chroma.scale(props.colors).mode(props.mode);
    const maxR = 0.9 * Math.min(width / 2, height / 2);
    if (props.triggerUpdate !== this.props.triggerUpdate) {
      this.timeouts.forEach((to) => clearTimeout(to));
      this.timeouts = [];
      this.svg.selectAll('circle').remove();
      props.updateProps({ pointCount: 0 });
      let pointCount = 0;
      d3.range(props.pointsToDraw).map((i) => {
        const theta = Math.random() * 2 * Math.PI;
        const r = Math.random() * maxR;
        const to = setTimeout(() => {
          this.svg.append('circle')
            .attr('cx', width / 2 + Math.cos(theta) * r)
            .attr('cy', height - height / 2 + Math.sin(theta) * r)
            .attr('r', 0)
            .attr('opacity', this.props.opacity)
            .attr('fill', this.scale(r / (maxR * 0.9)))
            .transition()
            .attr('r', Math.random() * +this.props.radius + 2.5 + 5 * i / props.pointsToDraw);
          pointCount++;
          props.updateProps({ pointCount: pointCount })
        }, Math.pow(i, 1.2) * 5);
        this.timeouts.push(to);
      })
    }
  }
}

module.exports = CustomD3Component;
