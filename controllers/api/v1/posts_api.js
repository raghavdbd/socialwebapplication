const Post=require('../../../models/posts')
const Comment=require('../../../models/comments')
// we creating opur api

module.exports.index= async function(req,res)
{

    let posts= await Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    return res.json(200,{

        message:"List of posts",
        posts:posts
    })
}
module.exports.destroy= async function(req,res){
    try{
        let post= await Post.findById(req.params.id)
        // .id converting object id into String
         if(post.user == req.user.id){
            // remove post
            post.remove();
            // delete all comments with associated post
           await Comment.deleteMany({post:req.params.id})
        //    if(req.xhr){
        //        return res.status(200).json({
        //            data:{
        //                post_id:req.params.id
        //            },message :"post deleted succesfully"
        //        })
        //    }
           return res.json(200,{
               message:"post and associated messagw deleted"
           })
        }else{
            return res.json(401),{
                MESSAGE:"YOU CANNOT DELETE THIS POST"
            }
        }
        
    }catch(err){
        console.log('****',err)
       return res.json(500,{
           message:"Internal server error"
       })
    }
   
}