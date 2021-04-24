const Posts=require('../models/posts')
// craeting controller for posts
const Comment=require('../models/comments')
module.exports.create=function(req,res){
    // we create a post
    Posts.create({
        // storing content
        content:req.body.content,
        // storing user who created post
        user:req.user._id
    },function(err,posts){
        if(err){
            console.log('error in craeting posts');
            return;
        }
        return res.redirect('back');
    }
    
    )

};
module.exports.destroy=function(req,res){
    Posts.findById(req.params.id,function(err,post){
        // .id converting object id into String
        if(post.user==req.user.id){
            // remove post
            post.remove();
            // delete all comments with associated post
            Comment.deleteMany({post:req.params.id},function(err){

                console.log(err,'error');
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}