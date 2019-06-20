import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  // constructor(){
  //   super();
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={this.healthCheck}> Get Health Check</button>
        </header>
      </div>
    );
  }

  healthCheck() {
    fetch('https://mars-photos.herokuapp.com/api/v1/rovers/Spirit/photos?sol=2006-10-27&camera=PANCAM',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
    ).then(result =>{
      result.json().then(json=>{
        console.log("resonse : ",json);
      })
    })
  }
}


export default App;
