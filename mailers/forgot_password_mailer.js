const nodemailer = require('../config/nodemailer');

exports.newToken = (token) => {
    nodemailer.transporter.sendMail({
        from: 'project.email.1980@gmail.com', // sender address
        to: token.user.email, // list of receivers
        subject: "Your link to reset password", //Subject line
        html:   `
                    Copy and paste this link to the URL <br><br>
                    localhost:8000/forgot_password/${token.accessToken}
                `, // html body
    }, (err, info) => {
        if(err){
            console.log('Error in sending password reset mail', err);
            return;
        }

        console.log('Password reset mail sent successfully', info);
        return;
    });
}