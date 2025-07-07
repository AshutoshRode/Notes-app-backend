const mysql2 = require('mysql2')

const pool= mysql2.createPool({
    
    host :'sql12.freesqldatabase.com',
    user:'sql12788691',
    password:'pZkGFRa3QN',
    port:3306,
    database:'sql12788691',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
})

// module.exports = pool 
// const mysql2 = require('mysql2')

// const pool= mysql2.createPool({
    
//     host :'localhost',
//     user:'root',
//     password:'Ashutosh@1999',
//     port:3306,
//     database:'notesapp',
//     waitForConnections:true,
//     connectionLimit:10,
//     queueLimit:0
// })

// module.exports = pool 