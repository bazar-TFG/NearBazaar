const express = require('express');
const router = express.Router();
const multer = require("multer")

const mysqlConnection = require('../database');


const diskstorage = multer.diskStorage({
    destination: "./public/images/untrated",
    filename: (req, file, cb) =>{
        let date = Date.now()
        cb(null, date + "-" + file.originalname)
        //let temp = date + "-" + files.originalname
        
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
    var name = req.file.filename
    console.log(name)
    mysqlConnection.query('insert into untreated_picture (path_untreated_picture, bazaar_id_bazaar) values (?, @bazaar_id_update);', [name], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'bazaar picture Saved'});
        } else {
            console.log(err);
        }
    });
});

module.exports = router