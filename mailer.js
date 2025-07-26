const nodemailer = require('nodemailer')
const fs = require('fs')

function sendEmail(template, subject, email, replacements, callback) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ashutoshmusic1999@gmail.com',
            pass: 'ftpvvxbagyyuuonq'
        }
    })

    let contents = '' + fs.readFileSync('./email_templates/' + template)

    // Replace placeholders with actual values (e.g. {{VERIFICATION_LINK}})
    for (const key in replacements) {
        const pattern = new RegExp(`{{\\s*${key}\\s*}}`, 'g')
        contents = contents.replace(pattern, replacements[key])
    }

    const mailOptions = {
        from: 'ashutoshmusic1999@gmail.com',
        to: email,
        subject: subject,
        html: contents,
    }

    transporter.sendMail(mailOptions, function (error, info) {
        callback(error, info)
    })
}

module.exports = {
    sendEmail: sendEmail,
}
