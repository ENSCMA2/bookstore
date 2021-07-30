let mongoose = require('mongoose');
let Course = require('../models/course');

/*
 * GET /course route to retrieve all the courses.
 */
function getCourses(req, res) {
	//Query the DB and if no errors, send all the courses
	let query = Course.find({});
	query.exec((err, courses) => {
		if(err) res.send(err);
		//If no errors, send them back to the client
		res.json(courses);
	});
}

/*
 * POST /course to save a new course.
 */
function postCourse(req, res) {
	//Creates a new course
	var newCourse = new Course(req.body);
	//Save it into the DB.
	newCourse.save((err, course) => {
		if(err) {
			res.send(err);
		}
		else { //If no errors, send it back to the client
			res.json({message: "Course successfully added!", course });
		}
	});
}

/*
 * GET /course/:id route to retrieve a course given its id.
 */
function getCourse(req, res) {
	Course.findById(req.params.id, (err, course) => {
		if(err) res.send(err);
		//If no errors, send it back to the client
		res.json(course);
	});		
}

/*
 * DELETE /course/:id to delete a course given its id.
 */
function deleteCourse(req, res) {
	Course.remove({_id : req.params.id}, (err, result) => {
		res.json({ message: "Course successfully deleted!", result });
	});
}

/*
 * PUT /course/:id to update a course given its id
 */
function updateCourse(req, res) {
	Course.findById({_id: req.params.id}, (err, course) => {
		if(err) res.send(err);
		Object.assign(course, req.body).save((err, course) => {
			if(err) res.send(err);
			res.json({ message: 'Course updated!', course });
		});	
	});
}

//export all the functions
module.exports = { getCourses, postCourse, getCourse, deleteCourse, updateCourse };