'use strict'

const response = require('./../response')
const db = require('./../settings/db')

exports.getAllUsers = (req, res) => {
    db.query('SELECT * FROM `users`', (error, rows, fields) => {
        if(error) {
            console.log(400, error, res);
        } else{
            response.status(200, rows, res);
        }
    })
}

exports.signup = (req, res) => {

    db.query("SELECT * FROM `users` WHERE `login` = '" + req.body.login + "'", (error, rows, fields) =>{
        if(error){
            response.status(400, error, res);
        } else if(typeof rows !== 'undefined' && rows.length > 0){
            console.log(rows);
            const row = JSON.parse(JSON.stringify(rows));
            row.map(item => {
                response.status(302, {message: `Пользователь с именем - ${item.login} уже существует!`}, res);
                return true;
            })
        } else{
            const sql = "INSERT INTO users (login, password, role) VALUES ('" + req.body.login + "','" + req.body.password + "','" + req.body.role +"')";
            db.query(sql, (error, results) => {
                if(error) {
                    response.status(400, error, res);
                } else{
                    response.status(200, {message: 'Успешная регистрация', results}, res);
                }
            })
        }
    })
}