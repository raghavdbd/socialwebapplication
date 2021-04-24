const Comment =require('../models/comments');
const Post = require('../models/posts');


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
                res.redirect('/')
            }
    }catch(err){
        console.log('error',err);
    }
  
        }
            
        
    


    module.exports.destroy = async function(req, res){
       let comment = await Comment.findById(req.params.id);
            if (comment.user == req.user.id){
    
                let postId = comment.post;
    
                comment.remove();
    
              let post=  Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}})
              return res.redirect('back');
            }else{
                return res.redirect('back');
            }
     
    }