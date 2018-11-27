var mongoose = require('mongoose');

var Schema = mongoose.Schema;
// add list of session and list of topics
var ParticipantSchema = new Schema(
  {
    ParticipantID: {type: String, required: true, max: 100},
    LastName: {type: String, required: true, max: 100},
    FirstName: {type: String, required: true, max: 100},
    Address: {type: String, required: true, max: 100},
    Email: {type: String, required: true, max: 100},
    TimeStamp: {type: Date},
    ParticipantType: {type: String, required: true, max: 100},
  }
);

// Virtual for participant's full name
ParticipantSchema
.virtual('name')
.get(function () {
  return this.LastName + ', ' + this.FirstName;
});



// Virtual for participant's URL
ParticipantSchema
.virtual('url')
.get(function () {
  return '/admin/participant/' + this._id;
});

//Export model
module.exports = mongoose.model('Participant', ParticipantSchema);
