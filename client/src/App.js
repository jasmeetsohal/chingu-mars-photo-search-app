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
    // const divMainStyle = {
    //   'background-image': "url(https://mars.nasa.gov/imgs/2017/05/PIA21635-br2.jpg)"
    // }
    let appClass = this.state.toggleSearch ? 'container-fluid h-100' : 'App-before';
    return (
      <div className={appClass}>
        { this.state.toggleSearch ? 
          <div  className="w-100 p-3 h-50">
          <button className="btn btn-outline-light" onClick={this.toggleSearchBoard} >Home</button>
          </div>
          :''}
       
           {this.state.toggleSearch? <Mars /> :
            <header className="App-header">
           <p>Explore an adventure of NASA's Criosity rover taking spectacular photos of Mars</p>
           <button className="btn btn-warning" onClick={this.toggleSearchBoard}>Dive Inside</button>
           </header>
           } 
        
        
      </div>
    );
  }

  toggleSearchBoard = () => {
    this.setState(state => ({
        toggleSearch: !state.toggleSearch
    }));
  }

  
}
