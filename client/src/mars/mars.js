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
            return  <div className="img-thumbnail d-block h-30 w-30 m-2 justify-content-center" key={i}> 
            <img  className="rounded img-fluid " src={data.img_src} alt="Not found"/>
            <div className="caption" > 
            <p > Photo taken by {data.camera.name} camera on sol {data.sol} Earth date <code>{data.earth_date}</code> </p>
            </div>
            </div>
      })
       return (
          <div className="col-sm-12">
           <form className="form-inline d-flex justify-content-center border-top p-4">
              <input type="text" className="form-control m-1" value={this.state.sol} onChange={this.handleSOLChange} placeholder="SOL"></input>
              <select className="form-control  m-1" value={this.state.camera} onChange={this.handleCameraOptionChange}>
                  {
                      this.state.cameraOptions.map( (camera,index) => {
                          return <option key={index} value={camera}>{camera}</option>
                      })
                  }
              </select>
              <button type="button" className="btn btn-primary  m-1" onClick={this.searchPhotos}>Search</button>
             
              </form>
              <div className="col-12 p-5 mt-4 mb-4 border border-white justify-content-center">
                 
                 {
                     this.state.resPhotoList.length > 0 ? images : <p>No Photo</p> 
                 }
                 
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
    let response = await fetch(`https://chingu-mars-photo-search-app.herokuapp.com/api/mars/photos/?sol=${this.state.sol}&camera=${this.state.camera}`,
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
    }
}
