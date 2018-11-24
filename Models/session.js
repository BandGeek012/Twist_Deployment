var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SessionSchema = new Schema(
  {
    SessionNum: {type:String, required: true, max:100},
    TimeStamp: {type: Date}

  }
);





// Virtual for session's URL
ParticipantSchema
.virtual('url')
.get(function () {
  return '/catalog/session/' + this._id;
});

//Export model
module.exports = mongoose.model('Session', SessionSchema);
