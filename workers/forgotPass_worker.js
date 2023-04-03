const queue = require('../config/kue');
const forgotPasswordMailer = require('../mailers/forgot_password_mailer');

queue.process('emails', function(job, done){
    forgotPasswordMailer.newToken(job.data);

    done();
});