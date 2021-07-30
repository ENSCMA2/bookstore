
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8080;
let book = require('./app/routes/book');
let course = require('./app/routes/course');
let student = require('./app/routes/student');
let teacher = require('./app/routes/teacher');
let config = require('config'); //we load the db location from the JSON files
//db options
let options = { 
				server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
              }; 

//db connection      
mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
	//use morgan to log at command line
	app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

app.get("/", (req, res) => res.json({message: "Welcome to our School!"}));

app.route("/book")
	.get(book.getBooks)
	.post(book.postBook);
app.route("/book/:id")
	.get(book.getBook)
	.delete(book.deleteBook)
	.put(book.updateBook);

app.route("/course")
	.get(course.getCourses)
	.post(course.postCourse);
app.route("/course/:id")
	.get(course.getCourse)
	.delete(course.deleteCourse)
	.put(course.updateCourse);

app.route("/student")
	.get(student.getStudents)
	.post(student.postStudent);
app.route("/student/:id")
	.get(student.getStudent)
	.delete(student.deleteStudent)
	.put(student.updateStudent);

app.route("/teacher")
	.get(teacher.getTeachers)
	.post(teacher.postTeacher);
app.route("/teacher/:id")
	.get(teacher.getTeacher)
	.delete(teacher.deleteTeacher)
	.put(teacher.updateTeacher);


app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing