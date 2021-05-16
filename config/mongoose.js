// require library
const mongoose = require('mongoose');
const env=require('./enviroment')
// connect to database
mongoose.connect(`mongodb://localhost/${env.db}`);
// acquire the connection(to check if it is succesfull)
const db = mongoose.connection;

// check error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log('succesfully connected to database')
});