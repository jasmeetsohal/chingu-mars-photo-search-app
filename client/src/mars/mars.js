import React, { Component } from 'react';
import './mars.css'

export default class Mars extends Component {
    constructor(props){
        super(props);
        this.state = {
            cameraOptions:['Any','FHAZ','NAVCAM','MAST','CHEMCAM','MAHLI','MARDI','RHAZ'],
            camera:'Any',
            sol: '',
            resPhotoList:[]
        }
    }

    render() {
        let images =  this.state.resPhotoList.map((data,i) => {
            return  <div className="column-img"> <img key={i} src={data.img_src} alt="Not found"/></div>
      })
       return (
          <div className="mars-search">
              <input type="text" value={this.state.sol} onChange={this.handleSOLChange} placeholder="SOL"></input>
              <select value={this.state.camera} onChange={this.handleCameraOptionChange}>
                  {
                      this.state.cameraOptions.map( (camera,index) => {
                          return <option key={index} value={camera}>{camera}</option>
                      })
                  }
              </select>
              <button type="button" onClick={this.searchPhotos}>Search</button>
              <div className="row-img">
                 
                  {images}
                  
              </div>
          </div>
       );   
    }

    handleSOLChange = (event) => {
        this.setState({
            sol: event.target.value
        });
    }

    handleCameraOptionChange = (event) =>{
        this.setState({
            camera: event.target.value
        });
    }

    searchPhotos = async () => {
    let response = await fetch(`http://localhost:4040/mars/photos/?sol=${this.state.sol}&camera=${this.state.camera}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      }
    }
    );
    let originalData = await response.json();
    this.setState({
        resPhotoList: originalData.photos
    });


    console.log("response Photoes ",this.state.resPhotoList);
    }
}
