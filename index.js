const express =require('express');
const cookieparser=require('cookie-parser');

const app= express();
const port =8000;
const expressEjsLayouts = require('express-ejs-layouts');
const expresslayouts= require('express-ejs-layouts');
const db=require('./config/mongoose')
// using middleware
app.use(express.urlencoded());
app.use(cookieparser);
app.use(express.static('./assets'))
// app.use(expressLayouts);
app.set('layout extractStyle',true)
app.set('layout extractScript',true)

// require router

app.use('/',require('./routes/index'))
app.set('view engine','ejs');
app.set('views','./views')


// creating server
app.listen(port, function(err){
    if (err) {
        // we use interpolation method here
        console.log(`err:${err}`);
    }
    console.log('Yup!My Server is running on Port', port);
})