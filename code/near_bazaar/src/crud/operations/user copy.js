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
const app = express();
router.post('/loggin', (req, res) => {
    var cellUser = null
    var cellPass = null
    const {username, password} = req.body;
    mysqlConnection.query('SELECT username, password FROM user WHERE username = ? and password = ?;', [username, password], (err, rows, fields) => {
        if(!err) {
            //let cellUser, cellPass
            console.log(username + " / " + password)
            //console.log(rows)
            Object.entries(rows).forEach(([key, value]) => {
                Object.entries(value).forEach(([key, value]) => {
                    //console.log(key + "/" + value)
                    if (key === "username"){
                        cellUser = value
                    }else if (key === "password"){
                        cellPass = value
                    }
                });
            });
            console.log(cellUser+ "/"+ cellPass)
            if (cellUser === username && cellPass === password){
                console.log("Loggin");
                cellUser = null 
                cellPass = null
                
                console.log("Loggin success");
                res.redirect(
                    301,
                    //Redirigir a la pagina que queria el usuario
                    //Por ejemplo, si queriia crear un bazar continuar a esa, si queria editar su perfil...
                    //Si no es posible redirigir siempre a la pagina principal
                    '/home'
                );
            }
            //res.json(
                //Respuesta de usuario existente
            //);
        } else {
            console.log(err);
        }
    });
});


app.get('/home', function (req, res) {
    console.log("Redirigiendo a la pagina principal");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
    //res.setHeader('Access-Control-Request-Headers', 'http://localhost:3300, x-requested-with');
    res.redirect(
        301,
        //Redirigir a la pagina que queria el usuario
        //Por ejemplo, si queriia crear un bazar continuar a esa, si queria editar su perfil...
        //Si no es posible redirigir siempre a la pagina principal
        'http://localhost:3000/home'
    );

});

router.post('/us/post', (req, res) => {
    const { username, email, password } = req.body
    mysqlConnection.query('insert into user (username, email, password) values (?, ?, ?);', [username, email, password], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'User Saved'});
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

module.exports = router