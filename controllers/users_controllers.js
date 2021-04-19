const User=require('../models/user')
module.exports.profile = function(req, res){

    // we check profile only open wehen user is sign in
    if(req.cookies.user_id){
        // now find the user
        User.findById(req.cookies.user_id,function(err,user){
            
            if(user){

                return res.render('user_profile',{
                    title:"User Profile",
                    user:user
            
           
            })
        }
        return res.redirect('/users/signin')
        
    });

}else{
    return res.redirect('users/signin');
}
}
// render signup page
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
                    console.log('error in creating user')
                }
                return res.redirect('/users/signin')
            }


            )}else{
         return res.redirect('back');       
        }
        
    })


}
module.exports.createsession = function(req,res){
// find user
User.findOne({email:req.body.email},function(err,user){
    if(err){
        console.log('error in finding user');
    }
    if(user){
        if(user.password !=req.body.password){
            return res.redirect('back');


        }
        res.cookie('user_id',user.id);
        return res.redirect('/users/profile')
    }else{
        return res.redirect('back')
    }

})
// if user find check password
// if user not find
}