// require passport library
const passport = require('passport');
// require passport library
const LocalStrategy = require('passport-local').Strategy;
// require User
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
  // A string describing the name of the field on the user model that is used as the unique identifier
    usernameField:'email'
},
    function(email, password, done) {
      // find user to establish identiity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log('error in finding user')
           return done(err); 
          }
          if(!user || user.password!=password){
            console.log('Invalid username/password');
            return done(null ,  false);
          }
          return done(null , user);
       
  
                }        );
              }
));
// seralizing user means we putting key into cookies

passport.serializeUser(function(user,done){
  done(null,user.id)
})

// deseralizing user menas decript the key which kept in cookie
passport.deserializeUser(function(id,done){
  User.findById(id,function(err,user){
    if(err){
      console.log('error in finding user');
      return done(err);

    }
    return done(null,user);

  })
})
module.exports=passport; 