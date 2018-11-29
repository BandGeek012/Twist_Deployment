var Presenter = require('../models/presenter');

var async = require('async');

exports.index = function(req, res) {   
    
    async.parallel({
        presenter_count: function(callback) {
            presenter.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        presenter_instance_count: function(callback) {
            presenter.countDocuments({}, callback);
        },
        presenter_instance_available_count: function(callback) {
            presenter.countDocuments({status:'Available'}, callback);
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

// Display list of all Presenters.
exports.presenter_list = function(req, res, next) {

    Presenter.find({}, 'LastName FirstName PresenterID')
      .populate('PresenterID')
      .exec(function (err, list_presenters) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('presenter_list', { title: 'Presenter List', presenter_list: list_presenters });
      });
      
  };

  // Display detail page for a specific presenter.
  exports.presenter_detail = function(req, res) {
      res.send('NOT IMPLEMENTED: Presenter detail: ' + req.params.id);
  };
  
  // Display Presenter create form on GET.
  exports.presenter_create_get = function(req, res) {
      res.send('NOT IMPLEMENTED: Presenter create GET');
  };
  
  // Handle Presenter create on POST.
  exports.presenter_create_post = function(req, res) {
      res.send('NOT IMPLEMENTED: Presenter create POST');
  };
  
  // Display Presenter delete form on GET.
  exports.presenter_delete_get = function(req, res) {
      res.send('NOT IMPLEMENTED: Presenter delete GET');
  };
  
  // Handle Presenter delete on POST.
  exports.presenter_delete_post = function(req, res) {
      res.send('NOT IMPLEMENTED: Presenter delete POST');
  };
  
  // Display Presenter update form on GET.
  exports.presenter_update_get = function(req, res) {
      res.send('NOT IMPLEMENTED: Presenter update GET');
  };
  
  // Handle Presenter update on POST.
  exports.presenter_update_post = function(req, res) {
      res.send('NOT IMPLEMENTED: Presenter update POST');
  };