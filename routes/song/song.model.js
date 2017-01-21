(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var SongSchema = new Schema({
        
    });

module.exports = mongoose.model('Song', SongSchema);

})();