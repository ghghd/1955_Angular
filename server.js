//---------------------imports---------------------------------
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './static')));
app.use(express.static(__dirname + '/myFirstAngularApp/dist'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//--------------db---------------------------------------------

mongoose.connect('mongodb://localhost/1955');
const PeopleSchema = new mongoose.Schema({
    name: {type: String, required: [true, "why no name?"], minlength: 3},
}, {timestamps: true});
mongoose.model('People', PeopleSchema);
const People = mongoose.model('People')

//------------------------Routes-------------------------------

app.get('/', function(req, res) {
    People.find({}, function(err, people){
        if (err){
            console.log('Something went wrong')
        }
        else{
            console.log('here is the result', people);
            console.log(people);
            res.json(people);
        }
    })
})
//---------------Add Person------------------------------------
app.get('/new/:name/', function(req, res) {
    let name = req.params.name;
    const people = new People({name: name});
    people.save(function(err){
        if (err){
            console.log('something went wrong');
        }
        else{
            console.log('successfully added a person!');
            res.redirect("/");
        }
    })
  
})
app.get('/remove/:name/', function(req, res) {
    let name = req.params.name;
    People.remove({name: name}, function(err){
        if(err){
            res.redirect('/', {errors: people.errors})
        }
        else{
            console.log('it worked')
            res.redirect('/')
        }
    })
})
app.get('/:name', function(req, res){
    let name = req.params.name;
    People.find({name: name}, function(err, person){
        if (err){
            console.log('Something went wrong')
        }
        else{
            console.log('here is the result', person);
            console.log(person);
            res.json(person);
        }
    })
})
//------------------------Routes-------------------------------
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})