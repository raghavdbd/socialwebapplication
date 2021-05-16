const nodemailer = require("nodemailer");
const ejs=require('ejs');
const path=require('path');
const env=require('./enviroment')


  // create reusable transporter object using the default SMTP transport
//   transport define configeration through which i send email
  let transporter = nodemailer.createTransport(env.smtp);
// this define  html file we send with email

  let renderTemplate=(data,relativePath) =>{
      let mailHTML;
      ejs.renderFile(
          path.join(__dirname,'../views/mailer',relativePath),
        //   here data defines what is fulfilled in 
          data,function(err,template){
              if(err){
                  console.log('error in rendering template',err);
                  return;
              }
              mailHTML=template;
          }


      )
      return mailHTML;
  }

  module.exports={
      transporter:transporter,
      renderTemplate:renderTemplate
  }