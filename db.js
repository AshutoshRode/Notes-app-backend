const mysql2 = require('mysql2')

const pool= mysql2.createPool({
    
    host :'localhost',
    user:'root',
    password:'Ashutosh@1999',
    port:3306,
    database:'notesapp',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
})

module.exports = pool 