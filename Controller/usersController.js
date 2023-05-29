'use strict'

const jwt = require('jsonwebtoken')

const response = require('./../response')
const db = require('./../settings/db')
const config = require('./../config')

exports.getAllUsers = (req, res) => {
    // res.render('users', {root: "./"})
    
    db.query("SELECT * FROM `users`", (error, rows, fields) => {
        if (error) {
            console.log(400, error, res);
          } else {
            console.log(rows)
            res.render('users', {root: "./", data: rows})
          }
    })
}

exports.deleteUser = (req, res) => {
    if(req.body.button_action == 'Удалить'){
        db.query("DELETE FROM `users` WHERE `login` = '" + req.body.login + "'", (error, rows, fields) =>{
            if(error){
                console.log(error);
            } else{
                console.log('успешно удалено!');
            }
        }) 
    }
}

exports.usersHandler = (req, res) => {

    if(req.body.button_action == "Новая учетная запись"){
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

    if(req.body.button_action == 'Удалить'){
        db.query("DELETE FROM `users` WHERE `login` = '" + req.body.login + "'", (error, rows, fields) =>{
            if(error){
                console.log(error);
            } else{
                console.log('успешно удалено!');
            }
        }) 
    }
}

exports.signin = (req,res) => {
    db.query("SELECT `id`, `login`, `password` FROM `users` WHERE `login` = '"+req.body.login+"'", (error, rows, field) => {
        if(error){
            response.status(400, error, res);
        } else if(rows.length <= 0){
            response.status(404, 'user in not found', res);
        } else{
            const row = JSON.parse(JSON.stringify(rows));
            row.map(item => {
                const password = req.body.password == item.password ? true: false;
                if(password){
                    const token = jwt.sign({
                        userId: item.id,
                        login: item.login
                    }, config.jwt, {expiresIn: '24h'});
                    res.redirect('/users')
                    // response.status(200, {token: `Bearer ${token}`}, res);
                } else{
                    response.status(401, {message: 'password not valid'}, res);
                }
                return true;
            })
        }
    })
}