const jwt = require('jsonwebtoken')
const secret = '123412341234'


function client() {
    const data = { id: 1 }

    const token = jwt.sign(data, '123412341234')
    console.log(token)
}

client()

function server() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ5NTUzNzUwfQ.IkF8BGn9qbs9UOkLoE2ytGNxm0aMgunYaY54Z08Tdsg'

    const data = jwt.verify(token, secret)
    console.log(data)
}

server()