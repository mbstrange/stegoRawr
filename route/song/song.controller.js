(function() {
    'use strict';

    var Song = require('./song.model');


//Basic CRUD
    
    //grab all for display
    module.exports.getAll = function(req, res) { 
        Song.find({}, function (err, post) {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            res.json(post);
        });
    };
      
    //grab by id
    module.exports.getByID = function(req, res) { 
        Song.find({"": req.params.ID}, function (err, post) {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            res.json(post);
        });
    };

    //create a new post
    module.exports.create = function(req, res) {
        var song = new Song(req.body);
        song.save(function(err, post) {
          if (err) {
                console.log("ERROR - Song Create");
                console.error(err);
                return res.status(500).send(err);
          }
          res.json(post);
        });
     };
    
    
})();