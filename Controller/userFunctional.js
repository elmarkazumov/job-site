const response = require('./../response')
const db = require('./../settings/db')
const config = require('./../config')

exports.createVacancy = (req, res) => {
    // res.render('createVacancy', {root: "./"})
    
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
    // res.render('users', {root: "./"})
    
    db.query("SELECT * FROM `Vacancy`", (error, rows, fields) => {
        if (error) {
            console.log(400, error, res);
          } else {
            console.log(rows)
            res.render('viewVacancy', {root: "./", data: rows})
          }
    })
}