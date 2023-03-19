const mysql = require('mysql');

const connection = mysql.createConnection({
    server: 'localhost',
    user: 'root',
    password: 'root',
    database: 'jobsite'
});


connection.connect(function(err) {
    if (err) {
      return console.log('ошибка: ' + err.message);
    }  
    return console.log('Подключились к базе данных MySQL');
})

module.exports = connection