//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Student = require('../app/models/student');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Students', () => {
	beforeEach((done) => { //Before each test we empty the database
		Student.remove({}, (err) => { 
		   done();		   
		});		
	});
 /*
  * Test the /GET route
  */
  describe('/GET student', () => {
	  it('it should GET all the students', (done) => {
			chai.request(server)
		    .get('/student')
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
  describe('/POST student', () => {
	  it('it should not POST a student without gradYear field', (done) => {
	  	let student = {
	  		firstName: "Joe",
              lastName: "Bob",
              courses: [1, 2],
              grades: [99.9, 99.8]
	  	}
			chai.request(server)
		    .post('/student')
		    .send(student)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('errors');
			  	res.body.errors.should.have.property('gradYear');
			  	res.body.errors.gradYear.should.have.property('kind').eql('required');
		      done();
		    });
	  });
	  it('it should POST a student ', (done) => {
	  	let student = {
            firstName: "Joe",
            lastName: "Bob",
            gradYear: 2023,
            courses: [1, 2],
            grades: [99.9, 99.8]
        }
			chai.request(server)
		    .post('/student')
		    .send(student)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('message').eql('Student successfully added!');
			  	res.body.student.should.have.property('firstName');
			  	res.body.student.should.have.property('lastName');
			  	res.body.student.should.have.property('gradYear');
			  	res.body.student.should.have.property('courses');
                  res.body.student.should.have.property('grades');
		      done();
		    });
	  });
  });
 /*
  * Test the /GET/:id route
  */
  describe('/GET/:id student', () => {
	  it('it should GET a student by the given id', (done) => {
	  	let student = new Student({
            firstName: "Joe",
            lastName: "Bob",
            gradYear: 2023,
            courses: [1, 2],
            grades: [99.9, 99.8]
        });
	  	student.save((err, student) => {
	  		chai.request(server)
		    .get('/student/' + student.id)
		    .send(student)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('firstName');
			  	res.body.should.have.property('lastName');
			  	res.body.should.have.property('gradYear');
			  	res.body.should.have.property('courses');
                  res.body.should.have.property('grades');
			  	res.body.should.have.property('_id').eql(student.id);
		      done();
		    });
	  	});
			
	  });
  });
 /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id student', () => {
	  it('it should UPDATE a student given the id', (done) => {
	  	let student = new Student({
            firstName: "Joe",
            lastName: "Bob",
            gradYear: 2023,
            courses: [1, 2],
            grades: [99.9, 99.8]
        });
	  	student.save((err, student) => {
				chai.request(server)
			    .put('/student/' + student.id)
			    .send({
                    firstName: "Joe",
                    lastName: "Bob",
                    gradYear: 2024,
                    courses: [1, 2],
                    grades: [99.9, 99.8]
                })
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Student updated!');
				  	res.body.student.should.have.property('gradYear').eql(2024);
			      done();
			    });
		  });
	  });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id student', () => {
	  it('it should DELETE a student given the id', (done) => {
	  	let student = new Student({
            firstName: "Joe",
            lastName: "Bob",
            gradYear: 2023,
            courses: [1, 2],
            grades: [99.9, 99.8]
        });
	  	student.save((err, student) => {
				chai.request(server)
			    .delete('/student/' + student.id)
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Student successfully deleted!');
				  	res.body.result.should.have.property('ok').eql(1);
				  	res.body.result.should.have.property('n').eql(1);
			      done();
			    });
		  });
	  });
  });
});
  