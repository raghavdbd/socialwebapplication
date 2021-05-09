const like=require('../models/like');
const Comment=require('../models/comments');
const Post=require('../models/posts');
module.exports.toggleLike=async function(req,res){
    try{
        let likable;
        let deleted=false;
        if(req.query.type=='Post'){
            likable=await Post.findById(req.query.id).populate('likes');

        }else{
            likable=await Comment.findById(req.query.id).populate('likes');
        }
// check if likes is already exist 
let existinglike=await like.findOne({
    likable:req.query.id,
    onModel:req.query.type,
    user:req.user._id
})
if(existinglike){
    // then delete the like
//  this is a way to pull out like
    likable.likes.pull(existinglike._id)
    likable.save();
    existinglike.remove();
    deleted=true;

}else{
    let newlike=await like.create({
        user:req.user._id,
        likable:req.query.id,
        onModel:req.query.type
    });
    likable.likes.push(newlike._id);
    likable.save();

}
return res.json(200,{
    message:"request succesful",
    data:{
        deleted:deleted
    }
})

    }catch(err){
        console.log(err);
        return res.json(500,{
            message:'internal server error'
        })
    }

}