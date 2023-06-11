const response = require('../response')
const db = require('../settings/db')
const localStorage = require("localStorage")
const alert = require('alert')

exports.createVacancy = (req, res) => {
    db.query("SELECT * FROM `Vacancy` WHERE `name` = '" + req.body.name + "'", (error, rows, fields) =>{
        if(error){
            response.status(400, error, res);
        } else if(typeof rows !== 'undefined' && rows.length > 0){
            console.log(rows);

            const row = JSON.parse(JSON.stringify(rows));

            row.map(item => {
                alert(`Вакансия с названием - ${item.name} уже существует!`);
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
                    alert('Вакансия успешно размещена');
                    res.redirect('/viewsVacancy');
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
            res.render('viewVacancy', {root: "./", data: rows, roleUser: localStorage.getItem('role')})
          }
    })
}

exports.changeVacancy = (req, res) => {
    if(req.body.button_action == 'Удалить'){
        db.query("DELETE FROM `Vacancy` WHERE `id` = '" + req.body.vacancyBlock_id + "'", (error, rows, fields) =>{
            if(error){
                console.log(error);
            } else{
                alert('Успешно удалено!');
                res.redirect('/viewsVacancy');
            }
        }) 
    }
    if(req.body.button_action == 'Изменить'){
        localStorage.setItem('id', req.body.vacancyBlock_id);
        res.redirect('/editVacancy');
    }
}

exports.editVacancy = (req, res) => {
    db.query("SELECT * FROM `Vacancy` WHERE `id` = '" + localStorage.getItem('id') + "'", (error, rows, fields) =>{
        if(error){
            console.log(error);
        } else{
            res.render('editVacancy', {root: "./", data: rows, roleUser: localStorage.getItem('role')});
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

exports.getAllResume = (req, res) => {
    db.query("SELECT * FROM `resume`", (error, rows, fields) => {
      if (error) {
          console.log(400, error, res);
        } else {
          res.render('viewsResume', {root: "./", data: rows, roleUser: localStorage.getItem('role')})
        }
  })
}

exports.deleteResume = (req, res) => {
    if(req.body.button_delete == 'Удалить'){
        db.query("DELETE FROM `resume` WHERE `id` = '" + req.body.resume_id + "'", (error, rows, fields) =>{
            if(error){
                console.log(error);
            } else{
                alert('Успешно удалено!');
                res.redirect('/viewsResume');
            }
        }) 
    }
}

exports.changeStatusResume = (req, res, next) => {
    if(req.body.button_close == 'Завершить'){
        db.query("UPDATE `resume` SET `status` = '" + "Обработано" + "' WHERE `id` = '" + req.body.resume_id + "'", (error, rows, fields) => {
            if(error){
                console.log(error);
            } else{
                res.redirect('/viewsResume');
            }
        })
    }

    if(req.body.button_close == 'Вернуть в ожидаемое'){
        db.query("UPDATE `resume` SET `status` = '" + "В ожидании" + "' WHERE `id` = '" + req.body.resume_id + "'", (error, rows, fields) => {
            if(error){
                console.log(error);
            } else{
                res.redirect('/viewsResume');
            }
        })
    }    
    next();
}