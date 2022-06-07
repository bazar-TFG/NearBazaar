const express = require("express");
const cors = require("cors");

const app = express();

/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept');
  next();
});


var corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3300"],
  methods: ['GET','POST','DELETE','UPDATE','PUT'],
  preflight: true
};
*/
//app.use(cors(corsOptions));
app.use(cors());


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
// permite leer los datos enviados por un formulario
app.use(express.urlencoded({ extended: true }));

// simple route

app.use(require('./operations/home'));
app.use(require('./operations/ejemplo'));
app.use(require('./operations/user'));
app.use(require('./operations/bazaar'));
app.use(require('./operations/location'));
app.use(require('./operations/bazaarType'));
app.use(require('./operations/pictures'));

// set port, listen for requests
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});











/*
const express = require('express');
const app = express();

//Configuración
app.set('port', process.env.PORT || 3000);

app.use(express.json());

//Route
app.use(require('./operations/user'));
app.use(require('./operations/bazaar'));
app.use(require('./operations/location'));
app.use(require('./operations/bazaarType'));
app.use(require('./operations/pictures'));

app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'))
});

*/