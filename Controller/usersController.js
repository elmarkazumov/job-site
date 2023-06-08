'use strict'

const jwt = require('jsonwebtoken')

const response = require('./../response')
const db = require('./../settings/db')
const config = require('./../config')
const localStorage = require('localStorage')
const alert = require('alert')

exports.getAllUsers = (req, res) => {
    
    db.query("SELECT * FROM `users`", (error, rows, fields) => {
        if (error) {
            console.log(400, error, res);
          } else {
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
                res.redirect('/users')
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
                    alert(`Пользователь с именем - ${item.login} уже существует!`);
                    res.redirect('/users');
                })
            } else{
                const sql = "INSERT INTO users (login, password, role, dateCreated) VALUES ('" + req.body.login + "','" + req.body.password + "','" + req.body.role
                 +"', CURDATE())";
                db.query(sql, (error, results) => {
                    if(error) {
                        response.status(400, error, res);
                    } else{
                        alert('Успешная регистрация');
                        res.redirect('/users');
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
                alert('успешно удалено!');
                res.redirect('/users');
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
                        login: item.login,
                        role: item.role
                    }, config.jwt, {expiresIn: '1h'});

                    res.cookie("token", token, {
                        httpOnly: true
                    })
                    return res.redirect('/users')
                } else{
                    response.status(401, {message: 'password not valid'}, res);
                }
                return true;
            })
        }
    })
}

exports.roleDelegation = (req, res, next) => {
    const token = req.cookies.token;
    const user = jwt.verify(token, config.jwt);
    
    db.query("SELECT `role` FROM `users` WHERE `login` = '" + user.login + "'", (error, rows, field) => {
        const row = JSON.parse(JSON.stringify(rows))
        row.map(item => {
            if(item.role == "admin"){
                localStorage.setItem('role', 'admin');
            } else{
                localStorage.setItem('role', 'worker');
                return res.redirect('/viewsVacancy');
            }
        })
    })
    next();
}

exports.logout = (req, res) => {
    res.clearCookie("token");
    return res.redirect('/login');
}