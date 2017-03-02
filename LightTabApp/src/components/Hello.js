import React, { Component } from 'react';
import Tappable from 'react-tappable';

import '../css/hello.css';

import Message from './Message';

export default class Hello extends Component {
  static displayName = 'Hello'
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    }
  }

  sayHello(msg) {
    // CSSTransitionGroup will fade this in
    this.setState({
      message: msg
    });
    setTimeout(() => {
      // CSSTransitionGroup will now fade this out
      this.setState({
        message: '',
      });
    }, 2000);
  }

  render() {
    return (
      <div className="hello">
        <Message message={this.state.message} />
        <Tappable
          className="button-say-hello"
          onTap={() => this.sayHello('Hello world')}
        >Say hello</Tappable>
      </div>
    );
  }
}