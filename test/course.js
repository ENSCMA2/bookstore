//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Course = require('../app/models/course');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Courses', () => {
	beforeEach((done) => { //Before each test we empty the database
		Course.remove({}, (err) => { 
		   done();		   
		});		
	});
 /*
  * Test the /GET route
  */
  describe('/GET course', () => {
	  it('it should GET all the courses', (done) => {
			chai.request(server)
		    .get('/course')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	  });
  });
 /*
  * Test the /POST route
  */
  describe('/POST course', () => {
	  it('it should not POST a course without number field', (done) => {
	  	let course = {
	  		title: "Introduction to Geometry",
              instructor: "Joe",
              year: 2021,
              semester: "fall"
	  	}
			chai.request(server)
		    .post('/course')
		    .send(course)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('errors');
			  	res.body.errors.should.have.property('number');
			  	res.body.errors.number.should.have.property('kind').eql('required');
		      done();
		    });
	  });
	  it('it should POST a course ', (done) => {
	  	let course = {
            title: "Introduction to Geometry",
            instructor: "Joe",
            year: 2021,
            semester: "fall",
            number: 1
	  	}
			chai.request(server)
		    .post('/course')
		    .send(course)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('message').eql('Course successfully added!');
			  	res.body.course.should.have.property('title');
			  	res.body.course.should.have.property('instructor');
			  	res.body.course.should.have.property('year');
			  	res.body.course.should.have.property('semester');
                  res.body.course.should.have.property('number');
		      done();
		    });
	  });
  });
 /*
  * Test the /GET/:id route
  */
  describe('/GET/:id course', () => {
	  it('it should GET a course by the given id', (done) => {
	  	let course = new Course({
            title: "Introduction to Geometry",
            instructor: "Joe",
            year: 2021,
            semester: "fall",
            number: 1
	  	});
	  	course.save((err, course) => {
	  		chai.request(server)
		    .get('/course/' + course.id)
		    .send(course)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('title');
			  	res.body.should.have.property('instructor');
			  	res.body.should.have.property('year');
			  	res.body.should.have.property('semester');
                  res.body.should.have.property('number');
			  	res.body.should.have.property('_id').eql(course.id);
		      done();
		    });
	  	});
			
	  });
  });
 /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id course', () => {
	  it('it should UPDATE a course given the id', (done) => {
	  	let course = new Course({
            title: "Introduction to Algebra",
            instructor: "Bob",
            year: 2021,
            semester: "fall",
            number: 1
	  	});
	  	course.save((err, course) => {
				chai.request(server)
			    .put('/course/' + course.id)
			    .send({
                    title: "Introduction to Algebra",
                    instructor: "Bob",
                    year: 2022,
                    semester: "fall",
                    number: 1
                  })
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Course updated!');
				  	res.body.course.should.have.property('year').eql(2022);
			      done();
			    });
		  });
	  });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id course', () => {
	  it('it should DELETE a course given the id', (done) => {
	  	let course = new Course({
            title: "Introduction to Algebra",
            instructor: "Bob",
            year: 2021,
            semester: "fall",
            number: 1
	  	});
	  	course.save((err, course) => {
				chai.request(server)
			    .delete('/course/' + course.id)
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Course successfully deleted!');
				  	res.body.result.should.have.property('ok').eql(1);
				  	res.body.result.should.have.property('n').eql(1);
			      done();
			    });
		  });
	  });
  });
});
  