const passport=require('passport');

const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;

const User=require('../models/user');
const env=require('./enviroment')
let opts = {
    // header is a list of keys in which we choose bearer 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codial'
}
passport.use(new JWTStrategy(opts,function(jwtpayLoad,done){

    User.findById(jwtpayLoad._id,function(err,user){
        if(err){
            console.log('error in finding user from jwt');
            return;
        }
        if(user){
            return done(null,user);

        }else{
            return done(null,false);
        }
    })
}));
module.exports=passport;