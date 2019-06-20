const request =require('request');

let fetchMarsPhotos = async (req,res,next) => {
    console.log("req :: ",req.query);
    let URL = `https://mars-photos.herokuapp.com/api/v1/rovers/Spirit/photos?sol=${req.query.sol}&camera=${req.query.camera}`;
    
    let response =  await new Promise( (resolve,reject) => {
           request(URL,{json:true},(err, res, body) => {
              if(err) reject(err);
              resolve(body);
           });
    });
    res.json(response);
    next();
}

module.exports = {fetchMarsPhotos};