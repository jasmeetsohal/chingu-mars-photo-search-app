var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('', function(req, res, next) {
  res.sendFile(process.env.app_root+'/build/index.html');
});

router.get('/health-check',(req,res,next) => {
  res.json({status:'Healthy'});
})



module.exports = router;
