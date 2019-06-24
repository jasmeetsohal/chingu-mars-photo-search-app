var express = require('express');
var marsRouter = express.Router();
var timeout = require('connect-timeout');
var marsController = require('../controller/mars.controller');

/* GET mars listing. */
// marsRouter.get('/photos', timeout('10s', { respond: true } ),haltOnTimedout, marsController.fetchMarsPhotos,errorHandler);

// function haltOnTimedout (req, res, next) {
//     console.log("request time out :: ",req.timedout);
//     if (!req.timedout) next();
//     else{
//         let err = new Error("Mars API response timeout error");
//         err.status = 504;
//         next(err);
//     }
//   }

//   function errorHandler( err, req, res, next) {
//     //handle your timeout error here
//     res.status(502).send("response timeout");
//     next();
// };

marsRouter.get('/photos',marsController.fetchMarsPhotos);

express.request
module.exports = marsRouter; 
