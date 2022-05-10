const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.post('/bzty/post', (req, res) => {
    const { stationery_bazaar_type, food_bazaar_type, general_bazaar_type} = req.body;
    mysqlConnection.query('insert into bazaar_type (stationery_bazaar_type, food_bazaar_type, general_bazaar_type, bazaar_id_bazaar) values (?, ?, ?, @bazaar_id_update);', 
    [stationery_bazaar_type, food_bazaar_type, general_bazaar_type], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'type Saved'});
        } else {
            console.log(err);
        }
    });
});

router.put('/bzty/put/:bazaar_id_bazaar', (req, res) => {
    const { stationery_bazaar_type, food_bazaar_type, general_bazaar_type} = req.body;
    const { bazaar_id_bazaar } = req.params;
    mysqlConnection.query('update bazaar_type set stationery_bazaar_type=?, food_bazaar_type=?, general_bazaar_type=? where bazaar_id_bazaar=?;', [stationery_bazaar_type, food_bazaar_type, general_bazaar_type, bazaar_id_bazaar], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Street Updated'});
        } else {
            console.log(err);
        }
    });
});

module.exports = router