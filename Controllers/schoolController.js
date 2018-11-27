var School = require('../models/highschool');

var async = require('async');

exports.index = function(req, res) {   
    
    async.parallel({
        school_count: function(callback) {
            school.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        participant_instance_count: function(callback) {
            participant.countDocuments({}, callback);
        },
        participant_instance_available_count: function(callback) {
            participant.countDocuments({status:'Available'}, callback);
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

// Display list of all Schools.
exports.school_list = function(req, res, next) {

    School.find({}, 'HSName HSID')
      .populate('HSID')
      .exec(function (err, list_schools) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('school_list', { title: 'School List', school_list: list_schools });
      });
      
  };

  // Display detail page for a specific school.
  exports.school_detail = function(req, res) {
      res.send('NOT IMPLEMENTED: School detail: ' + req.params.id);
  };
  
  // Display school create form on GET.
  exports.school_create_get = function(req, res) {
      res.send('NOT IMPLEMENTED: School create GET');
  };
  
  // Handle school create on POST.
  exports.school_create_post = function(req, res) {
      res.send('NOT IMPLEMENTED: School create POST');
  };
  
  // Display school delete form on GET.
  exports.school_delete_get = function(req, res) {
      res.send('NOT IMPLEMENTED: School delete GET');
  };
  
  // Handle school delete on POST.
  exports.school_delete_post = function(req, res) {
      res.send('NOT IMPLEMENTED: School delete POST');
  };
  
  // Display school update form on GET.
  exports.school_update_get = function(req, res) {
      res.send('NOT IMPLEMENTED: School update GET');
  };
  
  // Handle school update on POST.
  exports.school_update_post = function(req, res) {
      res.send('NOT IMPLEMENTED: School update POST');
  };