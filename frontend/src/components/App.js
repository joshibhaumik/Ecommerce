import React, { Component } from 'react';
import '../styles/App.css';
import Main from './MainComponent';

import { Provider } from 'react-redux';
import store from '../store';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;