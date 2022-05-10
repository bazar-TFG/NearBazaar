const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.post('/lc/post', (req, res) => {
    const { street_location } = req.body;
    mysqlConnection.query('insert into location (street_location, bazaar_id_bazaar) values (?, @bazaar_id_update);', [street_location], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'bazaar location Saved'});
        } else {
            console.log(err);
        }
    });
});

router.put('/lc/put/:bazaar_id_bazaar', (req, res) => {
    const { street_location } = req.body;
    const { bazaar_id_bazaar } = req.params;
    mysqlConnection.query('update location set street_location=? where bazaar_id_bazaar=?;', [street_location, bazaar_id_bazaar], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Street Updated'});
        } else {
            console.log(err);
        }
    });
});

module.exports = router