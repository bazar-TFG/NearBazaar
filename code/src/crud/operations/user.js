const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

/*
router.get('/us', (req, res)=> {
    mysqlConnection.query('Select * FROM user', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});
*/

//passport.use(new passportLocal(function(username, password, done){}));
router.post('/create_user', (req, res) => {
    const { username, email, password } = req.body
    var cellUser = null
    var cellEmail = null
    mysqlConnection.query('SELECT username, email FROM user WHERE username = ? or email = ?;', [username, email], (err, rows, fields) => {
        if(!err) {
            Object.entries(rows).forEach(([key, value]) => {
                Object.entries(value).forEach(([key, value]) => {
                    if (key === "username"){
                        cellUser = value
                    }else if (key === "email"){
                        cellEmail = value
                    }
                });
            });
            if (cellUser === username || cellEmail === email){
                console.log("Loggin");
                cellUser = null 
                cellEmail = null
            } else {
                mysqlConnection.query('insert into user (username, email, password) values (?, ?, ?);', [username, email, password], (err, rows, fields) => {
                    if(!err) {
                        res.json({Status: 'User Saved'});
                    } else {
                        console.log(err);
                    }
                });
                cellUser = null 
                cellEmail = null
            }
            
        } else {
            console.log(err);
        }
    
    });
    
});



router.put('/us/put/:id_user', (req, res) => {
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

router.post('/loggin', (req, res) => {
    var cellUser = null
    var cellPass = null
    const {username, password} = req.body;
    mysqlConnection.query('SELECT id_user, username, email, password FROM user WHERE username = ? and password = ?;', [username, password], (err, rows, fields) => {
        if(!err) {
            Object.entries(rows).forEach(([key, value]) => {
                Object.entries(value).forEach(([key, value]) => {
                    if (key === "username"){
                        cellUser = value
                    }else if (key === "password"){
                        cellPass = value
                    }
                });
            });
            if (cellUser === username && cellPass === password){
                console.log("Loggin");
                cellUser = null 
                cellPass = null
                res.status(200).json(
                    rows
                );
            }
            
        } else {
            console.log(err);
        }
    
    });

});
/*
app.post('/', passport.authenticate('local',{
    successRedirect:"http://localhost:3000/home",
    failureRedirect:"/loggin"
}));  
*/


module.exports = router