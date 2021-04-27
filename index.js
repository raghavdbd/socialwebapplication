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
// to store session cookie in database we require connect mongo
const MongoStore = require('connect-mongodb-session')(session);
// initiliazing sass middleware
const sassMiddleware= require('node-sass-middleware');
// include library to display flah messages
const flash=require('connect-flash')
const customMware=require('./config/middleware');

// use sass to convert sass file to css file
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'

}))


// using middleware for storing data ind req.body
app.use(express.urlencoded());
app.use(cookieparser());
// using of static files
app.use(express.static('./assets'));
// make the upload path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));
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
    store:new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err){
        console.log(err || 'connect mongo-dn setup')
    }
    )



}));
// telling app to use passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setflash)

app.use('/',require('./routes'))


// creating server
app.listen(port, function(err){
    if (err) {
        // we use interpolation method here
        console.log(`err:${err}`);
    }
    console.log('Yup!My Server is running on Port', port);
})