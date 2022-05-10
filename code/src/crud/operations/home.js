//Consulta para todos los bazares
//select street_location, path_untreated_picture, stationery_bazaar_type, food_bazaar_type, general_bazaar_type from bazaar right join location as l on l.bazaar_id_bazaar = id_bazaar right join untreated_picture as up on up.bazaar_id_bazaar = id_bazaar right join bazaar_type as bt on bt.bazaar_id_bazaar = id_bazaar

const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/bazaars', (req, res) => {
    mysqlConnection.query('select id_bazaar,street_location, path_untreated_picture, stationery_bazaar_type, food_bazaar_type, general_bazaar_type, case when stationery_bazaar_type =  "Y" then "Papelería" when food_bazaar_type =  "Y" then "Alimentación" when general_bazaar_type =  "Y" then "General (variado)" end as tipo from bazaar right join location as l on l.bazaar_id_bazaar = id_bazaar right join untreated_picture as up on up.bazaar_id_bazaar = id_bazaar right join bazaar_type as bt on bt.bazaar_id_bazaar = id_bazaar;', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

module.exports = router