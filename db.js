// const mysql2 = require('mysql2');

// const pool = mysql2.createPool({
//     host: 'sql12.freesqldatabase.com',
//     user: 'sql12788691',
//     password: 'pZkGFRa3QN',
//     database: 'sql12788691',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });
// module.exports = pool 


const mysql2 = require('mysql2')

const pool= mysql2.createPool({
    
    host :'bbyvzst3ooow4c2xbtbg-mysql.services.clever-cloud.com',
    user:'ubsm6crero1e4lvh',
    password:'jtAjOshgPNDXP0bQf1O5',
    port:3306,
    database:'bbyvzst3ooow4c2xbtbg',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
})

module.exports = pool 

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
