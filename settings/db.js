const mysql = require('mysql');

const config = require('./../config')

const connection = mysql.createConnection({
    server: config.server,
    user: config.user,
    password: config.password,
    database: config.database,
    jwt: config.jwt
});


connection.connect(function(err) {
    if (err) {
      return console.log('ошибка: ' + err.message);
    }  
    return console.log('Подключились к базе данных MySQL');
})

module.exports = connection