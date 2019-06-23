const request =require('request');

let fetchMarsPhotos = async (req,res,next) => {
    let URL = `https://mars-photos.herokuapp.com/api/v1/rovers/Curiosity/photos?sol=${req.query.sol}&camera=${req.query.camera}`;
    if(req.query.camera == 'Any'){
        URL = `https://mars-photos.herokuapp.com/api/v1/rovers/Curiosity/photos?sol=${req.query.sol}`;
    } 
    try{
    let response =  await new Promise( (resolve,reject) => {
           request(URL,{json:true},(err, res, body) => {
              if(err) reject(err);
              console.log("inside promise :: ",req.timedout);
              if(req.timedout) reject("Request Timeout");
              resolve(body);
           });
    });
    res.json(response);
    next();
    } catch(e){
        console.log("Inside exception in promise :: ",e);
         res.status(400).send("Request Timeout");
         next();
    }
}


module.exports = {fetchMarsPhotos};