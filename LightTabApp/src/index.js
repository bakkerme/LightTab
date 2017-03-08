import './css/index.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'
import { updateParam } from './actions/index';
import reducers from './reducers/index';

import Rheostat from 'rheostat';
import './css/slider.css';

@connect()
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
          onValuesUpdated={(value) => {
            this.props.dispatch(updateParam('TEST_PARAM', value.values[0]))
          }}
        />
      </div>
    );
  }
};

let store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('app')
);
