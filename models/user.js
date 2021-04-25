const mongoose= require('mongoose');
// creating schema for db
const multer=require('multer');
const path=require('path');
const Avatar_path=path.join('/uploads/users/avatars');
const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
        password:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true

        },
        avatar:{
            type:String,
            // now we store path to file and file name  for file name we use epoke time which is in milli second
            
        }
           
        
        
},{
    timestamps:true
});
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',Avatar_path))
    },
    // file.fieldname covert file name into avatar +storing time in milli second
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
//   .single tell only one file will upload 
   UserSchema.statics.uploadedAvatar=multer({storage: storage}).single('avatar');
   UserSchema.statics.avatarpath=Avatar_path
 
const User=mongoose.model('User',UserSchema);
module.exports=User;