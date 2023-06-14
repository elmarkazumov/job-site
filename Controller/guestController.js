const response = require('../response')
const db = require('../settings/db')
const localStorage = require("localStorage")
const alert = require('alert')
const fileUpload = require('express-fileupload');


exports.getAllVacancy = (req, res) => {
    db.query("SELECT * FROM `Vacancy`", (error, rows, fields) => {
        if (error) {
                console.log(400, error, res);
            } else {
                res.render('index', {root: "./", data: rows})
            }
    })
}

exports.redirectVacancy = (req, res) => {
    localStorage.setItem('id', req.body.vacancyBlock_id);
    res.redirect('/vacancyForm');
}

exports.renderSelectedVacancy = (req, res) => {
    db.query("SELECT * FROM `Vacancy` WHERE `id` = '" + localStorage.getItem('id') + "'", (error, rows, fields) =>{
    if(error){
        console.log(error);
    } else{
        res.render('vacancyForm', {root: "./", data: rows});
        const row = JSON.parse(JSON.stringify(rows));
        row.map(vacancy => {
            localStorage.setItem('selectedVacancyName', vacancy.name);
        })
    }
    })
}

exports.sendForm = (req, res) => {
    let fileName;
    let date = Date.now();
    if(req.files == null){
        fileName = '0';
    } else{
        fileName = req.files.fileResume.name;
    }

    const sql = "INSERT INTO resume (name, email, phone, file, selectedVacancyName, status) VALUES ('"+ req.body.nameUser + "','" + req.body.email + "','" + req.body.phone + "','"
    + date + '-' + fileName + "','" + localStorage.getItem('selectedVacancyName') + "','" + "В ожидании" +"')";
    db.query(sql, (error, results) => {
        if(error) {
            response.status(400, error, res);
        } else{
            if(fileName != '0'){
                let upfile = req.files.fileResume;
                let updest = "./uploads/" + date + '-' + upfile.name;
    
                upfile.mv(updest, err => {
                    if (err) { console.log(0); }
                });
            } else{
                console.log('резюме отсутствует');
            }
            
            res.redirect('/vacancyForm');
        }
    })
}