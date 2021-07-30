//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Teacher = require('../app/models/teacher');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Teachers', () => {
	beforeEach((done) => { //Before each test we empty the database
		Teacher.remove({}, (err) => { 
		   done();		   
		});		
	});
 /*
  * Test the /GET route
  */
  describe('/GET teacher', () => {
	  it('it should GET all the teachers', (done) => {
			chai.request(server)
		    .get('/teacher')
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
  describe('/POST teacher', () => {
	  it('it should not POST a teacher without lastName field', (done) => {
	  	let teacher = {
	  		firstName: "Jane",
              courses: [1, 2]
	  	}
			chai.request(server)
		    .post('/teacher')
		    .send(teacher)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('errors');
			  	res.body.errors.should.have.property('lastName');
			  	res.body.errors.lastName.should.have.property('kind').eql('required');
		      done();
		    });
	  });
	  it('it should POST a teacher ', (done) => {
	  	let teacher = {
            firstName: "Jane",
            lastName: "Doe",
            courses: [1, 2]
        };
			chai.request(server)
		    .post('/teacher')
		    .send(teacher)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('message').eql('Teacher successfully added!');
			  	res.body.teacher.should.have.property('firstName');
			  	res.body.teacher.should.have.property('lastName');
			  	res.body.teacher.should.have.property('courses');
		      done();
		    });
	  });
  });
 /*
  * Test the /GET/:id route
  */
  describe('/GET/:id teacher', () => {
	  it('it should GET a teacher by the given id', (done) => {
	  	let teacher = new Teacher({
            firstName: "Jane",
            lastName: "Doe",
            courses: [1, 2]
        });
	  	teacher.save((err, teacher) => {
	  		chai.request(server)
		    .get('/teacher/' + teacher.id)
		    .send(teacher)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('firstName');
			  	res.body.should.have.property('lastName');
			  	res.body.should.have.property('courses');
			  	res.body.should.have.property('_id').eql(teacher.id);
		      done();
		    });
	  	});
			
	  });
  });
 /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id teacher', () => {
	  it('it should UPDATE a teacher given the id', (done) => {
	  	let teacher = new Teacher({
            firstName: "Jane",
            lastName: "Doe",
            courses: [1, 2]
        });
	  	teacher.save((err, teacher) => {
				chai.request(server)
			    .put('/teacher/' + teacher.id)
			    .send({
                    firstName: "Jane",
                    lastName: "Johnson",
                    courses: [1, 2]
                })
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Teacher updated!');
				  	res.body.teacher.should.have.property('lastName').eql("Johnson");
			      done();
			    });
		  });
	  });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id teacher', () => {
	  it('it should DELETE a teacher given the id', (done) => {
	  	let teacher = new Teacher({
            firstName: "Jane",
            lastName: "Doe",
            courses: [1, 2]
        });
	  	teacher.save((err, teacher) => {
				chai.request(server)
			    .delete('/teacher/' + teacher.id)
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Teacher successfully deleted!');
				  	res.body.result.should.have.property('ok').eql(1);
				  	res.body.result.should.have.property('n').eql(1);
			      done();
			    });
		  });
	  });
  });
});
  