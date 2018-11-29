var Schedule = require('../models/Schedule');

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        schedule_count: function(callback) {
            schedule.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        book_instance_count: function(callback) {
            BookInstance.countDocuments({}, callback);
        },
        book_instance_available_count: function(callback) {
            BookInstance.countDocuments({status:'Available'}, callback);
        },
        author_count: function(callback) {
            Author.countDocuments({}, callback);
        },
        genre_count: function(callback) {
            Genre.countDocuments({}, callback);
        },
    }, function(err, results) {
        res.render('index', { title: 'Local Library Home', error: err, data: results });
    });
};
// Display list of all schedules.
exports.schedule_list = function(req, res, next) {

    schedule.find({}, 'Schedule')
      .populate('schedule')
      .exec(function (err, list_schedules) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('schedule_list', { title: 'schedule List', schedule_list: list_schedules });
      });

  };

  // Display detail page for a specific schedule.
  exports.schedule_detail = function(req, res) {
      res.send('NOT IMPLEMENTED: schedule detail: ' + req.params.id);
  };

  // Display schedule create form on GET.
  exports.schedule_create_get = function(req, res) {
      res.send('NOT IMPLEMENTED: schedule create GET');
  };

  // Handle schedule create on POST.
  exports.schedule_create_post = function(req, res) {
      res.send('NOT IMPLEMENTED: schedule create POST');
  };

  // Display schedule delete form on GET.
  exports.schedule_delete_get = function(req, res) {
      res.send('NOT IMPLEMENTED: schedule delete GET');
  };

  // Handle schedule delete on POST.
  exports.schedule_delete_post = function(req, res) {
      res.send('NOT IMPLEMENTED: schedule delete POST');
  };

  // Display schedule update form on GET.
  exports.schedule_update_get = function(req, res) {
      res.send('NOT IMPLEMENTED: schedule update GET');
  };

  // Handle schedule update on POST.
  exports.schedule_update_post = function(req, res) {
      res.send('NOT IMPLEMENTED: schedule update POST');
  };
