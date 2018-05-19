import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserInterface from './UserInterface.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserInterface />
      </div>
    );
  }
}

export default App;
