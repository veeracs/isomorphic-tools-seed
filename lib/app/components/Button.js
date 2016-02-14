import React, { Component, PropTypes } from 'react';

class Button extends Component {
  static propTypes = {
    label: PropTypes.string,
    className: PropTypes.string
  };
  static defaultProps = {
    label: 'button',
    className: 'default-class'
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.className}>
        {this.props.label}
      </div>
    );
  }
}

export default Button;
