let mongoose = require('mongoose');
let Student = require('../models/student');

/*
 * GET /student route to retrieve all the students.
 */
function getStudents(req, res) {
	let query = Student.find({});
	query.exec((err, students) => {
		if(err) res.send(err);
		//If no errors, send them back to the client
		res.json(students);
	});
}

/*
 * POST /student to save a new student.
 */
function postStudent(req, res) {
	//Creates a new student
	var newStudent = new Student(req.body);
	//Save it into the DB.
	newStudent.save((err, student) => {
		if(err) {
			res.send(err);
		}
		else { //If no errors, send it back to the client
			res.json({message: "Student successfully added!", student });
		}
	});
}

/*
 * GET /student/:id route to retrieve a student given its id.
 */
function getStudent(req, res) {
	Student.findById(req.params.id, (err, student) => {
		if(err) res.send(err);
		//If no errors, send it back to the client
		res.json(student);
	});		
}

/*
 * DELETE /student/:id to delete a student given its id.
 */
function deleteStudent(req, res) {
	Student.remove({_id : req.params.id}, (err, result) => {
		res.json({ message: "Student successfully deleted!", result });
	});
}

/*
 * PUT /student/:id to update a student given its id
 */
function updateStudent(req, res) {
	Student.findById({_id: req.params.id}, (err, student) => {
		if(err) res.send(err);
		Object.assign(student, req.body).save((err, student) => {
			if(err) res.send(err);
			res.json({ message: 'Student updated!', student });
		});	
	});
}

//export all the functions
module.exports = { getStudents, postStudent, getStudent, deleteStudent, updateStudent };