import React from 'react';

class Action extends React.PureComponent {
  render() {
    const { children, hasError, updateProps, ...props } = this.props;
    return (
      <span {...props} className={'action'}>{children}</span>
    );
  }
}

export default Action;
