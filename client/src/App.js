import React from 'react';
import Mars from './mars/mars';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {toggleSearch: false};
  }

  render() {
    // console.log("public url :: ",process.env.PUBLIC_URL,window.location.origin);
    return (
      <div className="App">
        { this.state.toggleSearch ? 
          <div className="navBar"><button onClick={this.toggleSearchBoard}>Home</button></div>
          :''}
        <header className="App-header">
           {this.state.toggleSearch? <Mars /> : <button onClick={this.toggleSearchBoard}>Get In</button>} 
        </header>
        
      </div>
    );
  }

  toggleSearchBoard = () => {
    this.setState(state => ({
        toggleSearch: !state.toggleSearch
    }));
  }

  
}
