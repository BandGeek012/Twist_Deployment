var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SessionSchema = new Schema(
  {
    SessionNum: {type:String, required: true, max:100},
    PresenterID: {type: Schema.Types.ObjectId, ref: 'Presenter'},
    TimeStamp: {type: Date}

});

// Virtual for school's name
SessionSchema
.virtual('name')
.get(function () {
  return this.session;
});




// Virtual for session's URL
SessionSchema
.virtual('url')
.get(function () {
  return '/admin/session/' + this._id;
});

//Export model
module.exports = mongoose.model('Session', SessionSchema);

