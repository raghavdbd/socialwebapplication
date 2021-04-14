const express =require('express');
const app= express();
const port =8000;
// require router
app.use('/',require('./routes/index'))

// creating server
app.listen(port, function(err){
    if (err) {
        // we use interpolation method here
        console.log(`err:${err}`);
    }
    console.log('Yup!My Server is running on Port', port);
})