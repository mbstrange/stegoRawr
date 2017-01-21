(function() {
    'use strict';

    var express = require('express');
    var controller = require('./song.controller');    

    var router = express.Router();

    router.get('/all', controller.getAll);
    router.get('/:ID', controller.getByID);
   
    router.post('/new', controller.create);

    module.exports = router;

})();