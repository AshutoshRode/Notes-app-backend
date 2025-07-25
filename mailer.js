const nodemailer = require('nodemailer');
const fs = require('fs');

function sendEmail(template, subject, email, replacements, callback) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ashutoshmusic1999@gmail.com',
            pass: 'ftpvvxbagyyuuonq',
        },
    });

    let contents = '' + fs.readFileSync('./email_templates/' + template);

    // replace placeholders in template (e.g., {{VERIFICATION_LINK}})
    for (const key in replacements) {
        const placeholder = `{{${key}}}`;
        contents = contents.replace(new RegExp(placeholder, 'g'), replacements[key]);
    }

    const mailOptions = {
        from: 'ashutoshmusic1999@gmail.com',
        to: email,
        subject: subject,
        html: contents,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        callback(error, info);
    });
}

module.exports = {
    sendEmail: sendEmail,
};
