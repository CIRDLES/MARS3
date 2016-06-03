import React, {Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from '../configureStore'

const store = configureStore()

export default class Root extends Component{
  render() {
    return (
      <div>
        <h1>Test1</h1>
      </div>
    );
  }
};
