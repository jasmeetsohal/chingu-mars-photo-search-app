import React, { Component } from 'react';
import './mars.css'

export default class Mars extends Component {
    constructor(props){
        super(props);
        this.state = {
            cameraOptions:['Any','FHAZ','NAVCAM','MAST','CHEMCAM','MAHLI','MARDI','RHAZ'],
            camera:'Any',
            sol: '',
            resPhotoList:[],
            spinnerStatus: false,
            buttonDisable: false
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
              <input type="number" className="form-control m-1" value={this.state.sol} onChange={this.handleSOLChange} placeholder="SOL"></input>
              <select className="form-control  m-1" value={this.state.camera} onChange={this.handleCameraOptionChange}>
                  {
                      this.state.cameraOptions.map( (camera,index) => {
                          return <option key={index} value={camera}>{camera}</option>
                      })
                  }
              </select>
              <button type="button" className="btn btn-primary  m-1" onClick={this.searchPhotos} disabled={!this.state.sol || this.state.buttonDisable}>Search</button>
             
              </form>
              <div className="col-12 p-5 mt-4 mb-4 border border-white justify-content-center">
              {
                  this.state.spinnerStatus?
                  <div className="d-flex justify-content-center">
                <div className="spinner-border text-light" role="status">
                     <span className="sr-only">Loading...</span>
               </div>
               </div>
                 
                     :this.state.resPhotoList.length > 0 ? images : <p className="d-flex justify-content-center empty-list">Nothing to show.</p> 
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

    loadingSpinner = () => {
      return  <div class="spinner-border" role="status">
             <span class="sr-only">Loading...</span>
         </div> 
    }

    searchPhotos = async () => {
        let response,originalData;
    try{   
       this.setState(
           { 
               spinnerStatus:true,
               buttonDisable: true
            }
            );
     response = await fetch(`http://localhost:4040/api/mars/photos/?sol=${this.state.sol}&camera=${this.state.camera}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      }
    }
    );
    originalData = await response.json();
    this.setState({
        resPhotoList: originalData.photos,
        spinnerStatus: false,
        buttonDisable: false
    });
} catch(e){
    console.log("Exception while getting photos :: ",e);
}
   
    
    }

}
