import React, { Component } from 'react';
import marsService from './mars.service';
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
            errorMessage: false,
            page:1,
            hasMoreItems:true
        }
    }

    render() {
        let loader = (<div className="d-flex justify-content-center">
        <div className="spinner-border text-dark" role="status">
             <span className="sr-only">Loading...</span>
       </div>
       </div>)
       let images =[];
        images =  this.state.resPhotoList.map((data,i) => {
             return <div className="col-md-4" key={i}>
             <div className="card mb-4 box-shadow">
                 <img className="card-img-top" src={data.img_src} alt="Card" />
                     <div className="card-body">
                          <p className="card-text">Photo taken by {data.camera.name} camera on sol {data.sol} Earth date <code>{data.earth_date}</code> </p>
                          <div className="d-flex justify-content-between align-items-center">
                             <div className="btn-group">
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
                  <p className="lead text-muted">Remember SOL is the mission day when Curiosity rover landed on Mars. You can enter a range from 0 to 2445 to view
                  the photos from any Curiosity's camera</p>
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
                    this.state.resPhotoList.length > 0 ? images : ''
                    }
              
                </div>
                <p className="d-flex justify-content-center empty-list">{
                    this.state.errorMessage? <code>Response timeout</code>: !this.state.hasMoreItems && this.state.resPhotoList.length===0 ? <code>Nothing to show</code>
                    :'' }</p> 
                {this.state.spinnerStatus?loader:''}
                { this.state.hasMoreItems && this.state.resPhotoList.length > 24? <button type="button" className="btn btn-outline-warning" onClick={this.loadMore}>Load More...</button>:''}

            </div>
         </div>
        
  
      </main>
      <footer className="text-muted">
      <div className="container">
        <p className="float-right">
        </p>
       <p> Made with &#10084; by <a href="https://www.freecodecamp.org/jasmeetsohal">jasmeetsohal</a> </p>
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
        this.setState(
            { 
                spinnerStatus:true,
                buttonDisable: true,
                resPhotoList:[],
                page:1
             }
             );
    try{   
    let response = await marsService.getAllByPage(this.state.sol,this.state.camera, 1);
    this.setState(state=>({
        resPhotoList: response.photos,
        spinnerStatus: false,
        buttonDisable: false,
        hasMoreItems: response.photos.length === 25 ? true : false,
        page: response.photos.length === 25 ? state.page + 1 : state.page
    }));
} catch(e){
    this.setState({
        spinnerStatus: false,
        buttonDisable: false,
        errorMessage: true,
        hasMoreItems: false
    });
    console.log("Exception while getting photos :: ",e.response);
}
   
    
    }

    loadMore = async() =>{
        this.setState(
            { 
                spinnerStatus:true,
                buttonDisable: true,
             }
             );
    try{   
    let response = await marsService.getAllByPage(this.state.sol,this.state.camera, this.state.page);
    let currentResponse = this.state.resPhotoList;
    currentResponse.push(...response.photos);
    this.setState(state=>({
        resPhotoList: currentResponse,
        spinnerStatus: false,
        buttonDisable: false,
        hasMoreItems: response.photos.length === 25 ? true : false,
        page: response.photos.length === 25 ? state.page + 1 : state.page
    }));
} catch(e){
    this.setState({
        spinnerStatus: false,
        buttonDisable: false,
        errorMessage: true,
        hasMoreItems: false
    });
    }
}

}
