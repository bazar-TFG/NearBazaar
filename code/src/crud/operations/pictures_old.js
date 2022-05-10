const express = require('express');
const router = express.Router();
const multer = require("multer")
const fs = require('fs');

const mysqlConnection = require('../database');

//let temp = ""

const diskstorage = multer.diskStorage({
    destination: "./public/images/untrated",
    filename: (req, file, cb) =>{
        var date = Date.now()
        cb(null, date + "-" + file.originalname)
        //var temp = date + "-" + files.originalname
        
    }
})

const fileUpload = multer({
    storage: diskstorage,
}).single('image')

/*
router.post('/pc/post',(req, res) => {
    const { path_untreated_picture } = req.body;
    mysqlConnection.query('insert into untreated_picture (path_untreated_picture, bazaar_id_bazaar) values (?, @bazaar_id_update);', [path_untreated_picture], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'bazaar picture Saved'});
        } else {
            console.log(err);
        }
    });
});
*/
router.post('/pc/storage',fileUpload,(req, res) => {
    var temp = req.file.filename
    console.log(temp)
    mysqlConnection.query('insert into untreated_picture (path_untreated_picture, bazaar_id_bazaar) values (?, @bazaar_id_update);', [temp], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'bazaar picture Saved'});
        } else {
            console.log(err);
        }
    });
});

module.exports = router