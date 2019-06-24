const axios = require('axios');


let fetchMarsPhotos = async (req,res) => {
    req.query.camera = req.query.camera === 'Any' ? '' : req.query.camera;
    let URL = 'http://mars-photos.herokuapp.com/api/v1/rovers/curiosity/photos?';
    URL = `${URL}${req.query.sol?`sol=${req.query.sol}`:''}${req.query.camera?`&camera=${req.query.camera}`:''}${req.query.page?`&page=${req.query.page}`:''} `;
    try{
    let response = await axios({
            method:'GET',
            url: URL,
            timeout: 10 * 1000,
            headers:{
                "content-type":"application/json"
            }
        });
        res.json(response.data);
    } catch(e) {
        res.status(400).send("Response timeout");
    }
   
}


module.exports = {fetchMarsPhotos};