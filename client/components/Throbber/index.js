import React, { Component, PropTypes } from 'react';

import s from './style.scss';

class Throbber extends Component {
  constructor(props) {
    super(props);
    this.state = { waiting: true };
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ waiting: false });
    }, this.props.wait);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    if (!this.state.waiting) {
      return <div className={s.throbber} />;
    }

    return null;
  }
}

Throbber.propTypes = {
  wait: PropTypes.number,
};

Throbber.defaultProps = {
  wait: 0,
};

export default Throbber;
