const Post=require('../models/posts');
const User=require('../models/user');
module.exports.home=function(req,res){
    // console.log(req.cookie);
    // res.cookie(('user_id',25));
    // Post.find({},function(err,posts){
    //   return  res.render('home',{
    //         title:'codial|home',
    //         posts:posts

    // })
   
    // })
    // to populaate user we to do this
    // in exec we write call back function 
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        User.find({},function(err,user){
            return  res.render('home',{
                title:'codial|home',
                posts:posts,
                all_users:user

        })

       

    })

    })
};