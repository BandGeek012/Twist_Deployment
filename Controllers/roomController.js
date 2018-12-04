var Room = require('../models/room');

var async = require('async');

exports.index = function(req, res) {   
    
    async.parallel({
        room_count: function(callback) {
            room.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        room_instance_count: function(callback) {
            room.countDocuments({}, callback);
        },
        room_instance_available_count: function(callback) {
            room.countDocuments({status:'Available'}, callback);
        },
        author_count: function(callback) {
            Author.countDocuments({}, callback);
        },
        genre_count: function(callback) {
            Genre.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Local Library Home', error: err, data: results });
    });
};

// Display list of all rooms.
exports.room_list = function(req, res, next) {

    Room.find({}, 'RoomNumber Capacity')
      .populate('RoomNumber')
      .exec(function (err, list_rooms) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('room_list', { title: 'Room List', room_list: list_rooms });
      });
      
  };

  // Display detail page for a specific room.
  exports.room_detail = function(req, res) {
      res.send('NOT IMPLEMENTED: Room detail: ' + req.params.id);
  };
  
  // Display Room create form on GET.
  exports.room_create_get = function(req, res) {
      res.send('NOT IMPLEMENTED: Room create GET');
  };
  
  // Handle Room create on POST.
  exports.room_create_post = function(req, res) {
      res.send('NOT IMPLEMENTED: Room create POST');
  };
  
  // Display Room delete form on GET.
  exports.room_delete_get = function(req, res) {
      res.send('NOT IMPLEMENTED: Room delete GET');
  };
  
  // Handle Room delete on POST.
  exports.room_delete_post = function(req, res) {
      res.send('NOT IMPLEMENTED: Room delete POST');
  };
  
  // Display Room update form on GET.
  exports.room_update_get = function(req, res) {
      res.send('NOT IMPLEMENTED: Room update GET');
  };
  
  // Handle Room update on POST.
  exports.room_update_post = function(req, res) {
      res.send('NOT IMPLEMENTED: Room update POST');
  };