const Comment =require('../models/comments');
const Post = require('../models/posts');
const commentsMailer = require('../mailer/comment_mailer');
const Like=require('../models/like')
// craeting controller for posts
module.exports.create= async function(req,res){
    // first we have to find post 
    try{

        let post= await  Post.findById(req.body.post);
        if(post){
       let comment= await  Comment.create({
                // storing content
                content:req.body.content,
                post:req.body.post,
                // storing user who created post
                user:req.user._id
            })
                post.comments.push(comment);
                post.save();
                comment = await comment.populate('user', 'name email').execPopulate();
            commentsMailer.newComment(comment);
            if (req.xhr){
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');

                res.redirect('/')
            }
    }catch(err){

        req.flash('error', err);
        return;
  
        }}
            
        
    


    module.exports.destroy = async function(req, res){
       let comment = await Comment.findById(req.params.id);
            if (comment.user == req.user.id){
    
                let postId = comment.post;
    
                comment.remove();
    
              let post=  Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}})
              await Like.deleteMany({likeable:post,onModel:'Post'});
            
// send the comment id which was deleted back to the views
             if (req.xhr){
    return res.status(200).json({
        data: {
            comment_id: req.params.id
        },
        message: "Post deleted"
    });
}


req.flash('success', 'Comment deleted!');

return res.redirect('back');
}else{
req.flash('error', 'Unauthorized');
return res.redirect('back');
}

}