import './css/index.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
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
          values={[50]}
          onValuesUpdated={(value) => console.log(value.values[0])}
        />
      </div>
    );
  }
};

let store = createStore();

ReactDOM.render(<App />, document.getElementById('app'));
