const express=require('express');

const router = express.Router();
const passport=require('passport')
const usersController=require('../controllers/users_controllers');
router.get('/profile',passport.checkAuthentication,usersController.profile);
// create a router for creating a signup
router.get('/signup',usersController.signup)
// create a router for creating a signin
router.get('/signin',usersController.signin)
// create a router for creating a user
router.post('/create',usersController.create);
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'}
),usersController.createsession)
router.get('/sign-out',usersController.destroySession);

module.exports=router