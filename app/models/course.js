let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//course schema definition
let CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    year: { type: Number, required: true },
    semester: { type: String, required: true}, 
    number: { type: Number, required: true, min: 1},
  }, 
  { 
    versionKey: false
  }
);

//Exports the Coursechema for use elsewhere.
module.exports = mongoose.model('course', CourseSchema);