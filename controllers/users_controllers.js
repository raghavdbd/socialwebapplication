const User=require('../models/user')
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}
// render signup pagenpm start
module.exports.signup=function(req,res){
    res.render('user_sign_up',{
        title:"codial|signup"
    }
    )
}
// render signin page
module.exports.signin=function(req,res){
    res.render('user_sign_in',{
        title:"codial|signin"
    }
    )
}
// create controller of signup
module.exports.create=function(req,res){
    // first i match password with confirm password
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    // then i check user exist or not
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user')
        }
        // if user not exist then i create a user
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in finding user')
                }
                return res.redirect('/users/signin')
            }


            )}else{
         return res.redirect('back');       
        }
        
    })


}
module.exports.createsession=function(req,res){
    return res.redirect('/');
}