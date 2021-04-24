const Post=require('../models/posts');
const User=require('../models/user');
// we using async await method to custmize our code
module.exports.home = async  function(req,res){
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
try{
    let posts= await Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
   
     let users=await  User.find({});
     return  res.render('home',{
        title:'codial|home',
        posts:posts,
        all_user:users
          

        });


}catch(err){
    console.log('Error',err);
}
   
       

    };