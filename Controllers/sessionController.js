var Session = require('../models/session');


















//display all sessions
exports.session_list = function(req, res, next) {

  Session.find({}, 'presenter')
    .populate('presenter')
    .exec(funtion (err, list_sessions) {
      if (err) { return next(err); }
      //successful, so render
      res.render('session_list, { title: 'Session List', session_list: list_sessions});
    });
};
