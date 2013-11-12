var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define a new schema
var AstronautSchema = new Schema({
    timeStamp 	: Number,
    user 		: String,
    inTemp		: Number,
    outTemp		: Number,

    lastupdated : { type: Date, default: Date.now }
});

// export 'Astronaut' model
module.exports = mongoose.model('Astronaut',AstronautSchema);
