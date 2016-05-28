// SET UP THE SERVER
    var express  = require('express');                 // Requires Express to work
    var app      = express();                          // Creates an instance of express in the app
    var mongoose = require('mongoose');                // Requires Mongoose for Mongodb
    var morgan   = require('morgan');                   // Morgan sends log requests to the console for debugging
    var bodyParser = require('body-parser');          // Body Parser pulls information from HTML POST requests
    var methodOverride = require('method-override'); // Method Overrids simulates DELETE and PUT requests

// CONFIGURE THE SERVER
    mongoose.connect('mongodb://localhost/Todos');               // Connects to the mongoDB database

    app.use(express.static(__dirname + '/public'));                 // Sets the static files location
    app.use(morgan('dev'));                                         // In development, log every request to the console
    app.use(bodyParser.urlencoded({extended:true}));            // Parse the application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // Parse application/json
    // app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // Parse application/vnd.api+json as json
    app.use(methodOverride());                                      // Allow delete and put requests

// DEFINE THE MODEL
    var TodoSchema = mongoose.Schema({
        title : {type: String},                            // Title of project To-Do
        details: {type: String},                           // To-Do details
        priority: {type: Number, min:1, max:5, default:1}, // Sets the priority level
        contact: {type: String}                            // Point person for the to-do or project
    }, {timestamps: true});                                // When the to-do was created

    module.exorts = mongoose.model('Todo', TodoSchema);    // Exports the database model

// SET UP THE FRONT END OF THIS API
    // Angular, for any requests send back the single view file (index.html, located in the public folder)
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

// SET THE PORT WE ARE LISTENING TO
    app.listen(8080);
    console.log("...free tacos over on 8080, pass it on...");

// SET UP OUR ROUTES

// API GET Route - any time we hit this route, we get all of the to-dos.
    app.get('/api/todos', function(req, res) {
        // Grab all the to-dos in the database
        Todo.find(function(err, todos) {
        // if there is an error when retrieving to-dos, send that error; otherwise return all to-dos in JSON
            if (err)
                res.send(err)
                res.json(todos);
        });
    });

// API POST Route - any time we hit this route, we create a single to-do with a unique id number
    app.post('/api/todos', function(req, res) {
        // Create a to-do. The information to populate comes from the AJAX request
        // If the creation is good, add it; otherwise return an error
        Todo.create({
            title : req.body.text,
            details: req.body.text,
            priority: req.body.number,
            contact: req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);
            // Grab and spit out all the todos (old + the new one) or kick an error
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                    res.json(todos);
            });
        });
    });

// API DELETE Route - any time we hit this route, we delete a single to-do (by id number)
    app.delete('/api/todos/:todo_id', function(req, res) {
        // delete a to-do. If you can, do it; if not, kick an error
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);
            // Grab and spit out all the to-dos (minus the one we just deleted) or kick error
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                    res.json(todos);
            });
        });
    });
