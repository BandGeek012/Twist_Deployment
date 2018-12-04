var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PresenterSchema = new Schema(
  {
    PresenterID: {type: String, required: true, max: 100},
    LastName: {type: String, required: true, max: 100},
    FirstName: {type: String, required: true, max: 100},
    Occupation: {type: String, required: true, max: 100},
    MainPhone: {type: String, required: true, max: 100},
    MobilePhone: {type: String, required: true, max: 100},
    Email: {type: String, required: true, max: 100}
  }
);

// Virtual for presenters's full name
PresenterSchema
.virtual('name')
.get(function () {
  return this.LastName + ', ' + this.FirstName;
});



// Virtual for presenter's URL
PresenterSchema
.virtual('url')
.get(function () {
  return '/admin/presenter/' + this._id;
});

//Export model
module.exports = mongoose.model('Presenter', PresenterSchema);