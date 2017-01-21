(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();

  router.use('/song', require('./song'));  ;    

  module.exports = router;

})();


