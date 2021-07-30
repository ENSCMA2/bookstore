let mongoose = require('mongoose');
let Teacher = require('../models/teacher');

/*
 * GET /teacher route to retrieve all the teachers.
 */
function getTeachers(req, res) {
	let query = Teacher.find({});
	query.exec((err, teachers) => {
		if(err) res.send(err);
		//If no errors, send them back to the client
		res.json(teachers);
	});
}

/*
 * POST /teacher to save a new teacher.
 */
function postTeacher(req, res) {
	//Creates a new teacher
	var newTeacher = new Teacher(req.body);
	//Save it into the DB.
	newTeacher.save((err, teacher) => {
		if(err) {
			res.send(err);
		}
		else { //If no errors, send it back to the client
			res.json({message: "Teacher successfully added!", teacher });
		}
	});
}

/*
 * GET /teacher/:id route to retrieve a teacher given its id.
 */
function getTeacher(req, res) {
	Teacher.findById(req.params.id, (err, teacher) => {
		if(err) res.send(err);
		//If no errors, send it back to the client
		res.json(teacher);
	});		
}

/*
 * DELETE /teacher/:id to delete a teacher given its id.
 */
function deleteTeacher(req, res) {
	Teacher.remove({_id : req.params.id}, (err, result) => {
		res.json({ message: "Teacher successfully deleted!", result });
	});
}

/*
 * PUT /teacher/:id to update a teacher given its id
 */
function updateTeacher(req, res) {
	Teacherr.findById({_id: req.params.id}, (err, teacher) => {
		if(err) res.send(err);
		Object.assign(teacher, req.body).save((err, teacher) => {
			if(err) res.send(err);
			res.json({ message: 'Teacher updated!', teacher });
		});	
	});
}

//export all the functions
module.exports = { getTeachers, postTeacher, getTeacher, deleteTeacherr, updateTeacher };