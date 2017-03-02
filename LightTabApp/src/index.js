import './css/index.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Rheostat from 'rheostat';
import './css/slider.css';

class App extends Component {
  constructor(props) {
    super();

    this.state = {}
  }

  render() {
    return (
      <div>
        <Rheostat
          min={1}
          max={100}
        />
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));
