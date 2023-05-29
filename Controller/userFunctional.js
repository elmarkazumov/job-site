const response = require('./../response')
const db = require('./../settings/db')
const localStorage = require("localStorage")

exports.createVacancy = (req, res) => {
    db.query("SELECT * FROM `Vacancy` WHERE `name` = '" + req.body.name + "'", (error, rows, fields) =>{
        if(error){
            response.status(400, error, res);
        } else if(typeof rows !== 'undefined' && rows.length > 0){
            console.log(rows);

            const row = JSON.parse(JSON.stringify(rows));

            row.map(item => {
                response.status(302, {message: `Вакансия с названием - ${item.name} уже существует!`}, res);
                return true;
            })
        } else{
            const sql = "INSERT INTO Vacancy (name, description, respons, requirements, conditions, pay, pay_checkbox, schedule, timework, experience) VALUES ('" 
            + req.body.name + "','" + req.body.description + "','" + req.body.respons + "','" + req.body.requirements  + "','" + req.body.conditions + "','" + req.body.pay + "','" + 
            req.body.pay_checkbox + "','" + req.body.schedule  + "','" + req.body.timework + "','" + req.body.experience +"')";
            db.query(sql, (error, results) => {
                if(error) {
                    response.status(400, error, res);
                } else{
                    response.status(200, {message: 'Вакансия успешно размещена', results}, res);
                }
            })
        }
    })
}

exports.getAllVacancy = (req, res) => {
    db.query("SELECT * FROM `Vacancy`", (error, rows, fields) => {
        if (error) {
            console.log(400, error, res);
          } else {
            res.render('viewVacancy', {root: "./", data: rows})
          }
    })
}

exports.changeVacancy = (req, res) => {
    if(req.body.button_action == 'Удалить'){
        db.query("DELETE FROM `Vacancy` WHERE `id` = '" + req.body.vacancyBlock_id + "'", (error, rows, fields) =>{
            if(error){
                console.log(error);
            } else{
            }
        }) 
    }
    if(req.body.button_action == 'Изменить'){
        const vacancyId = req.body.vacancyBlock_id;
        localStorage.setItem('id', vacancyId);
        db.query("SELECT * FROM `Vacancy` WHERE `id` = '" + vacancyId + "'", (error, rows, fields) =>{
            if(error){
                console.log(error);
            } else{
                res.redirect('/editVacancy');
            }
        }) 
    }
}

exports.editVacancy = (req, res) => {
    db.query("SELECT * FROM `Vacancy` WHERE `id` = '" + localStorage.getItem('id') + "'", (error, rows, fields) =>{
        if(error){
            console.log(error);
        } else{
            res.render('editVacancy', {root: "./", data: rows});
        }
    }) 
}

exports.editSaveVacancy = (req, res) => { 
    db.query("UPDATE `Vacancy` SET `name` = '" + req.body.name + "', `description` = '" + req.body.description + "', respons = '" + req.body.respons + "', requirements = '" +
    req.body.requirements + "', conditions = '" + req.body.conditions + "', pay = '" + req.body.pay + "', pay_checkbox = '" + req.body.pay_checkbox + "', schedule = '" + req.body.schedule +
    "', timework = '" + req.body.timework + "', experience = '" + req.body.experience +"' WHERE `id` = '" + localStorage.getItem('id') + "'", (error, rows, fields) =>{
        if(error){
            console.log(error);
        } else{
            res.redirect('/viewsVacancy');
        }
    }) 
}