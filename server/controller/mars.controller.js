const request =require('request');

let fetchMarsPhotos = async (req,res,next) => {
    let URL = `https://mars-photos.herokuapp.com/api/v1/rovers/Curiosity/photos?sol=${req.query.sol}&camera=${req.query.camera}`;
    if(req.query.camera == 'Any'){
        URL = `https://mars-photos.herokuapp.com/api/v1/rovers/Curiosity/photos?sol=${req.query.sol}`;
    } 
    let response =  await new Promise( (resolve,reject) => {
           request(URL,{json:true},(err, res, body) => {
              if(err) reject(err);
              resolve(body);
           });
    });
    res.json(response);
}

let getHealthCheck = (req,res,next) => {
    res.json({status:'Healthy'});
}

module.exports = {fetchMarsPhotos,getHealthCheck};