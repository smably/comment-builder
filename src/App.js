import React, { Component } from 'react';
import CommentBucketBuilder from './CommentBucketBuilder';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Comment Builder</h2>
        </div>
        <p className="App-intro">
          <CommentBucketBuilder />
        </p>
      </div>
    );
  }
}

export default App;
