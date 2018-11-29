var Session = require('../models/session');

//display all sessions
exports.session_list = function(req, res, next) {

  Session.find({}, 'presenter')
    .populate('presenter')
    .exec(function (err, list_sessions) {
      if (err) { return next(err); }
      //successful, so render
      res.render('session_list', { title: 'Session List', session_list: list_sessions});
    });
};

// Display detail page for a specific session.
exports.session_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: session detail: ' + req.params.id);
};

// Display session create form on GET.
exports.session_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: session create GET');
};

// Handle session create on POST.
exports.session_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: session create POST');
};

// Display session delete form on GET.
exports.session_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: session delete GET');
};

// Handle session delete on POST.
exports.session_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: session delete POST');
};

// Display session update form on GET.
exports.session_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: session update GET');
};

// Handle session update on POST.
exports.session_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: session update POST');
};
