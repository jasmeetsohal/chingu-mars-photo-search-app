var express = require('express');
var marsRouter = express.Router();
var marsController = require('../controller/mars.controller')

/* GET mars listing. */
marsRouter.get('/health-check',marsController.getHealthCheck);
marsRouter.get('/photos', marsController.fetchMarsPhotos);


express.request
module.exports = marsRouter; 
