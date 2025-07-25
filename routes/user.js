const express = require('express');
const db = require('../db');
const crypto = require('crypto-js');
const mailer = require('../mailer');
const jwt = require('jsonwebtoken');
const config = require('../config');
const utils = require('../utils');

const router = express.Router();

//**************** User Routes *****************

router.get('/profile', (request, response) => {
    const statement = `select id, firstName, lastName, email, phone from user where id = ${request.id}`;
    db.execute(statement, (error, data) => {
        response.send(utils.createResult(error, data));
    });
});

// SignUp 
router.post('/signup', (request, response) => {
    const { firstName, lastName, email, password } = request.body;
    const encryptedPassword = '' + crypto.SHA256(password);

    const statement = `insert into user (firstName, lastName, email, password, status) values ('${firstName}','${lastName}','${email}','${encryptedPassword}', 0)`;

    db.execute(statement, (error, data) => {
        const result = utils.createResult(error, data);

        if (!error) {
            const userId = data.insertId;
            const token = jwt.sign({ id: userId }, config.secret, { expiresIn: '1d' });

            const verificationLink = `https://notes-app-backend-tq8j.onrender.com/user/verify/${token}`;

            mailer.sendEmail(
                'signup.html',
                'Welcome to Notes application - Verify Your Email',
                email,
                { VERIFICATION_LINK: verificationLink },
                (error, info) => {
                    if (error) {
                        console.error('Error sending verification email:', error);
                    }
                    response.send(result);
                }
            );
        } else {
            response.send(result);
        }
    });
});

// Verify using token
router.get('/verify/:token', (request, response) => {
    const { token } = request.params;
    try {
        const decoded = jwt.verify(token, config.secret);
        const userId = decoded.id;

        const statement = `update user set status = 1 where id = ${userId}`;
        db.execute(statement, (error, data) => {
            if (error) {
                console.error('Verification DB error:', error);
                response.send(`<h2>Verification failed. Please try again.</h2>`);
            } else {
                response.redirect('https://notes-app-two-umber.vercel.app/login?verified=true');
            }
        });
    } catch (error) {
        console.error('Verification token error:', error);
        response.send(`<h2>Verification link is invalid or expired. Please sign up again.</h2>`);
    }
});

// SignIn
router.post('/signin', (request, response) => {
    const { email, password } = request.body;
    const encryptedPassword = '' + crypto.SHA256(password);

    const statement = `select id, firstName, lastName, email, phone, status from user where email = '${email}' and password = '${encryptedPassword}'`;

    db.execute(statement, (error, users) => {
        const result = { status: '' };
        if (error) {
            result['status'] = 'error';
            result['error'] = error;
        } else {
            if (users.length == 0) {
                result['status'] = 'error';
                result['error'] = 'User does not exist';
            } else {
                const user = users[0];
                if (user['status'] == 0) {
                    result['status'] = 'error';
                    result['error'] = 'Please verify your account from your email before logging in.';
                } else if (user['status'] == 2) {
                    result['status'] = 'error';
                    result['error'] = 'Your account is suspended, please contact administrator';
                } else {
                    const token = jwt.sign({ id: user['id'] }, config.secret);
                    result['status'] = 'success';
                    result['data'] = {
                        token: token,
                        firstName: user['firstName'],
                        lastName: user['lastName'],
                        email: user['email'],
                        phone: user['phone']
                    };
                }
            }
        }
        response.send(result);
    });
});

module.exports = router;
