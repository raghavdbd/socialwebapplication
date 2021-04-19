const express=require('express');
const router = express.Router();
const usersController=require('../controllers/users_controllers');
router.get('/profile',usersController.profile);
// create a router for creating a signup
router.get('/signup',usersController.signup)
// create a router for creating a signin
router.get('/signin',usersController.signin)
// create a router for creating a user
router.post('/create',usersController.create);
router.post('/create-session',usersController.createsession);
module.exports=router