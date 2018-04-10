const React = require('react');
const Scroll = require('react-scroll');
const Element = Scroll.Element;
const scroller = Scroll.scroller;

let scrollId = 0;

class ScrollComponent extends React.Component {

  constructor(props) {
    super(props);
    this.id = scrollId++;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.section !== this.props.section) {
      scroller.scrollTo(nextProps.section, {
        duration: nextProps.duration,
        smooth: nextProps.smooth,
        offset: nextProps.offset,
        containerId: `scroll-${this.id}`
      })
    }
  }

  unwrapChild(c) {
    if (c => c.type.name && c.type.name.toLowerCase() === 'wrapper') {
      return c.props.children[0];
    }
    return c;
  }

  unwrapChildren() {
    return this.props.children.map((c) => this.unwrapChild(c));
  }

  renderChildren() {
    const unwrapped = this.unwrapChildren();
    return React.Children.map(this.props.children, (c, i) => {
      const child = unwrapped[i];
      if (c === child) {
        return React.cloneElement(c, { currentSection: this.props.section })
      } else {
        return React.cloneElement(c, { children: [React.cloneElement(child, {
          currentSection: this.props.section
        })]});
      }
    })
  }

  render() {
    const { section, children } = this.props;
    return (
      <div className={`scroll`} id={`scroll-${this.id}`}>
        { this.renderChildren() }
      </div>
    );
  }
}

ScrollComponent.defaultProps = {
  offset: -50,
  duration: 750,
  smooth: true
}

class Section extends React.Component {
  render() {
    const { children, currentSection, name, ...rest} = this.props;
    return <div
      className={`element ${name == currentSection ? 'selected' : ''}`}
      ref={(e) => scroller.register(name, e)}
    >{ children }</div>;
  }
}

ScrollComponent.Section = Section;
module.exports = ScrollComponent;
