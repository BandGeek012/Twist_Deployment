var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ScheduleSchema = new Schema(
  {
    SessionNum: {type: Schema.Types.ObjectId, ref: 'Session', required: true, max: 100},
    RoomNum: {type: Schema.Types.ObjectId, ref: 'Room', required: true, max: 100},
    TopicCode: {type: Schema.Types.ObjectId, ref: 'Topic', required: true, max: 100},
    PresenterID: {type: Schema.Types.ObjectId, ref: 'Presenter', required: true, max: 100},
    }
);



// Virtual for schedule's URL
ScheduleSchema
.virtual('url')
.get(function () {
  return '/admin/schedule/' + this._id;
});

//Export model
module.exports = mongoose.model('Schedule', ScheduleSchema);
