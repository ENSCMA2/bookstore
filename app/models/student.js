let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//student schema definition
let StudentSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gradYear: { type: Number, required: true, min: 1 },
    courses: { type: Array, required: true}, 
    grades: { type: Array, required: true}
  }, 
  { 
    versionKey: false
  }
);

//Exports the StudentSchema for use elsewhere.
module.exports = mongoose.model('student', StudentSchema);