const nodeMailer = require('../config/nodemailrer')


// this is another way of exporting a method
// we using arrow function
exports.newComment = (comment) => {
    console.log('inside newComment mailer', comment);

    nodeMailer.transporter.sendMail({
       from: 'codial.com',
       to: comment.user.email,
       subject: "New Comment Published!",
       html: '<h1>Yup, your comment is now published!</h1>' 
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}