const express = require('express')
const db = require('../db')
const crypto = require('crypto-js')
const mailer = require('../mailer')
const jwt = require('jsonwebtoken')
const config = require('../config')
const utils = require('../utils')

const router = express.Router()



//**************** User Routes *****************

router.get('/profile', (request, response) => {

    const statement = `select id, firstName, lastName, email, phone from user where id = ${request.id}`
    db.execute(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })
})

router.patch('/status/:id', (request, response) => {
    const { id } = request.params
    const { status } = request.body

    const statement = `update user set status = ${status} where id = ${id}`
    db.execute(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })
})


//verify
router.get('/verify/:id', (request, response) => {
    const { id } = request.params

    const statement = `update user set status = 1 where id = ${id}`
    db.execute(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })
})

router.post('/signup', (request, response) => {
    const { firstName, lastName, email, password } = request.body

    const encryptedPassword = '' + crypto.SHA256(password)

    const statement = `insert into user (firstName, lastName, email, password, status) values ('${firstName}','${lastName}','${email}','${encryptedPassword}', 0)`

    db.execute(statement, (error, data) => {
        const result = utils.createResult(error, data)

        if (!error) {
            const userId = data.insertId  // Get the new user's ID
            const verificationLink = `https://notes-app-backend-tq8j.onrender.com/user/verify/${userId}`

            mailer.sendEmail(
                'signup.html',
                'Welcome to Notes application',
                email,
                { VERIFICATION_LINK: verificationLink },
                (error, info) => {
                    response.send(result)
                }
            )
        } else {
            response.send(result)
        }
    })
})


//SignIn  
router.post('/signin', (request, response) => {
    const { email, password } = request.body
    //encrypt the password
    const encryptedPassword = '' + crypto.SHA256(password)

    const statement = `select id, firstName, lastName, email, phone, status from user where email = '${email}' and password = '${encryptedPassword}'`

    db.execute(statement, (error, users) => {

        const result = {
            status: '',
        }
        if (error != null) {
            //error while executing statement
            result['status'] = 'error'
            result['error'] = error
        }
        else {
            if (users.length == 0) {
                //user does not exist
                result['status'] = 'error'
                result['error'] = 'User does not exist'

            }
            else {
                const user = users[0]

                //check the user status
                //0:non-verified, 1:active , 2:suspended
                if (user['status'] == 0) {
                    result['status'] = 'error'
                    result['error'] = 'You have not verified your account yet. please verify your account'
                }
                else if (user['status'] == 2) {
                    result['status'] = 'error'
                    result['error'] = 'You account is suspended, please contact administrator'
                }
                else {

                    const token = jwt.sign({ id: user['id'] }, config.secret)

                    result['status'] = 'success'
                    result['data'] = {
                        token: token,
                        firstName: user['firstName'],
                        lastName: user['lastName'],
                        email: user['email'],
                        phone: user['phone']
                    }
                }


            }
        }
        response.send(result)
    })
    // response.send('user login')
})

router.get('/verify/:id', (request, response) => {
    const { id } = request.params;

    const statement = `update user set status = 1 where id = ${id}`;
    db.execute(statement, (error, data) => {
        response.send(utils.createResult(error, data));
    });
});


module.exports = router