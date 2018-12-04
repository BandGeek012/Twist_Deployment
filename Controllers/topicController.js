const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var Topic = require('../models/topic');

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        topic_count: function(callback) {
            topic.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        topic_instance_count: function(callback) {
            BookInstance.countDocuments({}, callback);
        },
        topic_instance_available_count: function(callback) {
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
// Display list of all topics.
exports.topic_list = function(req, res, next) {

    Topic.find({}, 'TopicID Title Description')
      .populate('TopicID')
      .exec(function (err, list_topics) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('topic_list', { title: 'Topic List', topic_list: list_topics });
      });

  };

  // Display detail page for a specific topic.
  exports.topic_detail = function(req, res) {
      res.send('NOT IMPLEMENTED: topic detail: ' + req.params.id);
  };

  // Display topic create form on GET.
  exports.topic_create_get = function(req, res) {
      res.send('NOT IMPLEMENTED: topic create GET');
  };

  // Handle topic create on POST.
  exports.topic_create_post = function(req, res) {
      res.send('NOT IMPLEMENTED: topic create POST');
  };

  // Display topic delete form on GET.
  exports.topic_delete_get = function(req, res) {
      res.send('NOT IMPLEMENTED: topic delete GET');
  };

  // Handle topic delete on POST.
  exports.topic_delete_post = function(req, res) {
      res.send('NOT IMPLEMENTED: topic delete POST');
  };

  // Display topic update form on GET.
  exports.topic_update_get = function(req, res) {
      res.send('NOT IMPLEMENTED: topic update GET');
  };

  // Handle topic update on POST.
  exports.topic_update_post = function(req, res) {
      res.send('NOT IMPLEMENTED: topic update POST');
  };
