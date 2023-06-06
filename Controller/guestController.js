const response = require('../response')
const db = require('../settings/db')
const localStorage = require("localStorage")

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
  const sql = "INSERT INTO resume (name, email, phone, file, selectedVacancyId, selectedVacancyName, status) VALUES ('"+ req.body.nameUser + "','" + req.body.email + "','" + req.body.phone + "','"
   + req.body.file + "','" + localStorage.getItem('id') + "','" + localStorage.getItem('selectedVacancyName') + "','" + "В ожидании" +"')";
  db.query(sql, (error, results) => {
      if(error) {
          response.status(400, error, res);
      } else{
          // response.status(200, {message: 'резюме отправлено!', results}, res);
      }
  })
}