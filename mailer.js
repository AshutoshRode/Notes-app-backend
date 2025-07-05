const nodemailer = require('nodemailer')
const fs = require('fs')

function sendEmail(template, subject, email, callback) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ashutoshmusic1999@gmail.com',
            pass: 'ftpvvxbagyyuuonq'
            // pass: 'jayshreeram@2022',

        },

    })

    const contents = '' + fs.readFileSync('./email_templates/' + template)
    // console.log(contents)

    const mailOptions = {
        from: 'ashutoshmusic1999@gmail.com',
        to: email,
        subject: subject,
        html: contents,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        callback(error, info)
    });
}

module.exports = {
    sendEmail: sendEmail,
} 