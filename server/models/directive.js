var mongoose = require('mongoose');

var directiveSchema = mongoose.Schema({
    title : {type: String, required: true},                            // Title of project To-Do
    details: {type: String},                           // To-Do details
    priority: {type: Number, min:1, max:5, default:1}, // Sets the priority level
    contact: {type: String}                            // Point person for the to-do or project
}, {timestamps: true });


module.exports = mongoose.model('Directive', directiveSchema);  // Exports the database model
