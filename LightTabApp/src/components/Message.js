import '../css/message.css';

import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';


export default class Message extends Component {
  static displayName = 'Message'
  static propTypes = {
    message: React.PropTypes.string,
  };
  
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    }
  }


  render() {
    const { message } = this.props;
    const msg = message
      ? <div className="hello-message" key="has-msg">{message}</div>
      : <div key="no-msg"></div>
    return (
      <CSSTransitionGroup transitionName="fade-message"
        transitionEnterTimeout={300} transitionLeaveTimeout={300}>
        {msg}
      </CSSTransitionGroup>
    );
  }
};
