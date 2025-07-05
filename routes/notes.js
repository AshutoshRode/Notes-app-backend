// Create router if not present
const express = require('express');
const router = express.Router();
const db = require('../db');
const utils = require('../utils');

// ✅ Get all notes for the logged-in user
router.get('/', (request, response) => {
    const statement = `SELECT id, title, contents FROM notes WHERE userId = ${request.id}`;
    db.execute(statement, (error, data) => {
        response.send(utils.createResult(error, data));
    });
});

// ✅ Add a note
router.post('/', (request, response) => {
    const { title, contents } = request.body;
    const statement = `INSERT INTO notes (title, contents, userId) VALUES ('${title}', '${contents}', ${request.id})`;
    db.execute(statement, (error, data) => {
        response.send(utils.createResult(error, data));
    });
});

// ✅ Update a note
router.put('/:id', (request, response) => {
    const { id } = request.params;
    const { title, contents } = request.body;
    const statement = `UPDATE notes SET title='${title}', contents='${contents}' WHERE id=${id} AND userId=${request.id}`;
    db.execute(statement, (error, data) => {
        response.send(utils.createResult(error, data));
    });
});

// ✅ Delete a note
router.delete('/:id', (request, response) => {
    const { id } = request.params;
    const statement = `DELETE FROM notes WHERE id=${id} AND userId=${request.id}`;
    db.execute(statement, (error, data) => {
        response.send(utils.createResult(error, data));
    });
});

module.exports = router;
