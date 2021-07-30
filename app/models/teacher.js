let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//teacher schema definition
let TeacherSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    courses: { type: Array, required: true}, 
  }, 
  { 
    versionKey: false
  }
);

//Exports the TeacherSchema for use elsewhere.
module.exports = mongoose.model('teacher', TeacherSchema);