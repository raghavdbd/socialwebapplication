module.exports.profile=function(req,res){
res.end('<h1>Users profile</h1>');
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
    
}