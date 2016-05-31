// SET UP THE SERVER
// require express, set an instance of express, require mongoose to help deal with the mongo database, require morgan to send log requests to the console for debugging, require body parser to pull info out of the HTML POST requests
    var express  = require('express');
    var app      = express();
    var mongoose = require('mongoose');
    var bodyParser = require('body-parser');


// CONFIGURE THE SERVER
// use express to set the static files(located in client)
    app.use(express.static('./client'));
// set the view and use ejs as the method for showing
    app.set('views', __dirname + '/client/views')
    app.set('view engine', 'ejs')
// connects to the mongoDB database
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/directives_api')
// use body parser to "read" the applicaiton
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
// set the index and API routers
    var indexRouter = require('./server/routes/index');
    var directivesRouter = require('./server/routes/api/directives');
// use the index and API routers
    app.use('/', indexRouter);
    app.use('/api/directives', directivesRouter);


// SET THE PORT WE ARE LISTENING TO
    app.listen(process.env.PORT || 8080, function(){
        console.log("...free tacos over on 8080, pass it on...");
    });
