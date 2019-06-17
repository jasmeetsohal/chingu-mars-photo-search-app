var express = require('express');
var marsRouter = express.Router();

/* GET mars listing. */
marsRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = marsRouter;
