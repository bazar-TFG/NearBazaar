const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.post('/bz/p/:user_id_user', (req, res) => {
    const { user_id_user } = req.params;
    mysqlConnection.query('insert into bazaar (user_id_user) values (?);', [user_id_user], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'bazaar Saved'});
        } else {
            console.log(err);
        }
    });
});
/*
router.put('/bz/put/:id_user', (req, res) => {
    const { username } = req.body;
    const { id_user } = req.params;
    mysqlConnection.query('update user set username=? where id_user=?;', [username, id_user], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Username Updated'});
        } else {
            console.log(err);
        }
    });
});
*/
module.exports = router