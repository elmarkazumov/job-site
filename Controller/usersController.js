'use strict'

const response = require('./../response')
const db = require('./../settings/db')

exports.users = (req, res) => {
    db.query('SELECT * FROM `users`', (error, rows, fields) => {
        if(error) {
            console.log(error);
        } else{
            response.status(rows, res);
        }
    })
}

exports.add = (req, res) => {
    const sql = "INSERT INTO users (login, password, role) VALUES ('" + req.query.login + "','" + req.query.password + "','" + req.query.role +"')";
    db.query(sql, (error, results) => {
        if(error) {
            return console.log(error);
        } else{
            response.status(results, res);
        }
    })
}