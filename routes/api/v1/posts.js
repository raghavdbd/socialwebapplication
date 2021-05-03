const express=require('express');
const  router=express.Router();
const postapi=require('../../../controllers/api/v1/posts_api');
const passport=require('passport');

router.get('/',postapi.index);
// we do session:false as we do nate want to create session cookie

router.delete('/:id',passport.authenticate('jwt',{session:false}),postapi.destroy);

module.exports=router