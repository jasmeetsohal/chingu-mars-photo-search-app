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
            buttonDisable: false,
            errorMessage: false
        }
    }

    render() {
        let images =  this.state.resPhotoList.map((data,i) => {
             return <div className="col-md-4" key={i}>
             <div className="card mb-4 box-shadow">
                 <img className="card-img-top" src={data.img_src} alt="Card" />
                     <div className="card-body">
                          <p className="card-text">Photo taken by {data.camera.name} camera on sol {data.sol} Earth date <code>{data.earth_date}</code> </p>
                          <div className="d-flex justify-content-between align-items-center">
                             <div className="btn-group">
                                 <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                             </div>
                         </div>
                      </div>
             </div>

          </div>
      })
       return (
        <div>
        <main role="main">
            <section className="jumbotron text-center">
                <div className="container">
                  <h1 className="jumbotron-heading">Curiosity</h1>
                  <p className="lead text-muted">Search here </p>
                  <p>
              <input type="number" className="form-control m-1" value={this.state.sol} onChange={this.handleSOLChange} placeholder="SOL"></input>
              <select className="form-control  m-1" value={this.state.camera} onChange={this.handleCameraOptionChange}>
                  {
                      this.state.cameraOptions.map( (camera,index) => {
                          return <option key={index} value={camera}>{camera}</option>
                      })
                  }
              </select>
              <button type="button" className="btn btn-primary  m-1" onClick={this.searchPhotos} disabled={!this.state.sol || this.state.buttonDisable}>Search</button>
             
                  </p>
                </div>
            </section>

        <div className="album py-5 bg-light">
            <div className="container">

                <div className="row">
                    {
                        this.state.spinnerStatus?
                        <div className="d-flex justify-content-center">
                      <div className="spinner-border text-dark" role="status">
                           <span className="sr-only">Loading...</span>
                     </div>
                     </div>
                       
                           :this.state.resPhotoList.length > 0 ? images : <p className="d-flex justify-content-center empty-list">{
                              this.state.errorMessage? <code>Response timeout</code>: 'Nothing to show'
                              }</p> 
                    }
            
                </div>

            </div>
         </div>
        
  
      </main>
      <footer className="text-muted">
      <div className="container">
        <p className="float-right">
        </p>
       <p>Made with</p>
      </div>
    </footer>
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
    this.setState(state=>({
        resPhotoList: originalData.photos,
        spinnerStatus: false,
        buttonDisable: false
    }));
} catch(e){
    this.setState({
        spinnerStatus: false,
        buttonDisable: false,
        errorMessage: true
    });
    console.log("Exception while getting photos :: ",e.response);
}
   
    
    }

}
