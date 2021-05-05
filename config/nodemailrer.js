const nodemailer = require("nodemailer");
const ejs=require('ejs');
const path=require('path');



  // create reusable transporter object using the default SMTP transport
//   transport define configeration through which i send email
  let transporter = nodemailer.createTransport({
      service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'raghavgoyaldbd478', // generated ethereal user
      pass: 'Raghav@905', // generated ethereal password
    },
  });
// this define  html file we send with email

  let renderTemplate=(data,relativePath) =>{
      let mailHTML;
      ejs.renderTemplate(
          path.join(__dirname,'../views/mailer'),
        //   here data defines what is fulfilled in 
          data,function(err,templets){
              if(err){
                  console.log('error in rendering template');
                  return;
              }
              mailHTML=templets;
          }


      )
      return mailHTML;
  }

  module.exports={
      transporter:transporter,
      renderTemplate:renderTemplate
  }