const express =require('express');
const cookieparser=require('cookie-parser');

const app= express();
const port =8000;

const expresslayouts= require('express-ejs-layouts');
const db=require('./config/mongoose')
// express-session use for session cookie
const session=require('express-session');
const passport=require('passport')
// require passport stratiggy
const passportLocal=require('./config/passport-local-strategies');

// using middleware for storing data ind req.body
app.use(express.urlencoded());
app.use(cookieparser());
// using of static files
app.use(express.static('./assets'));
// useing of layouts
app.use(expresslayouts)
// app.use(expressLayouts);
app.set('layout extractStyle',true)
app.set('layout extractScript',true)

// require router


app.set('view engine','ejs');
app.set('views','./views')
// we have to add middleware that take a cookie and encript it
app.use(session({
    name: 'codial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        // it tell in how much time our session expire
        maxAge: (1000 * 60 * 100)
    },



}));
// telling app to use passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'))


// creating server
app.listen(port, function(err){
    if (err) {
        // we use interpolation method here
        console.log(`err:${err}`);
    }
    console.log('Yup!My Server is running on Port', port);
})