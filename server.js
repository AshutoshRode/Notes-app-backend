const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');

// Routes
const routerUser = require('./routes/user');
const routerNotes = require('./routes/notes');


const app = express();

// Enable frontend to call APIs
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// JWT Middleware
app.use((request, response, next) => {
    if (
        request.url == '/user/signin' ||
        request.url == '/user/signup' ||
        request.url.startsWith('/user/verify') ||
        request.url.startsWith('/user/status')
        // request.url.startsWith('/notes') 
    ) {
        next();
    } else {
        const token = request.headers['token'];
        try {
            const payload = jwt.verify(token, config.secret);
            request.id = payload['id'];
            next();
        } catch (ex) {
            response.send({
                status: 'error',
                error: 'unauthorized access'
            });
        }
    }
});

// Route middlewares
app.use('/user', routerUser);
app.use('/notes', routerNotes);


app.listen(4000, '0.0.0.0', () => {
    console.log('server started on port 4000');
});