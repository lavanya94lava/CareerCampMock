const mongoose  = require('mongoose');

mongoose.connect(`mongodb://localhost/careercamp_db`);

const db = mongoose.connection;

db.on('error', console.log.bind(console,"Error in connecting to the db"));

db.once('open',function(){
    console.log("Connected to the DB carrer Camp");
});

module.exports = db;