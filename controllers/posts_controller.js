const Posts=require('../models/posts')
// craeting controller for posts
const Comment=require('../models/comments')
module.exports.create= async function(req,res){
    try{
     let post=   await Posts.create({
            // storing content
            content:req.body.content,
            // storing user who created post
            user:req.user._id
        } 
        
        )
        if(req.xhr){
            return  res.status(200).json({
                data:{
                    post:post
                },
                message:"post created"
            })
        }
        req.flash('success','post created')
        return res.redirect('back');

    }catch(err){
        req.flash('error','error in post creation')
        console.log('error',err);
    }
    // we create a post
   

};
module.exports.destroy= async function(req,res){
    try{
        let post= await Posts.findById(req.params.id)
        // .id converting object id into String
        if(post.user == req.user.id){
            // remove post
            post.remove();
            // delete all comments with associated post
           await Comment.deleteMany({post:req.params.id})
           if(req.xhr){
               return res.status(200).json({
                   data:{
                       post_id:req.params.id
                   },message :"post deleted succesfully"
               })
           }
           return res.redirect('back')
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('error',err);
    }
   
}