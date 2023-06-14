'user strict'

const { user } = require('../config')

module.exports = (app) => {
    const usersController = require('./../Controller/usersController')
    const vacancyController = require('../Controller/vacancyController')
    const guestController = require('../Controller/guestController')
    const cookieJwtAuth = require('../middleware/cookieJwtAuth')
    const localStorage = require('localStorage')

    app
        .route('/login')
        .get((req, res) => {
            res.render('login', {root: "./"})
        })
        .post(usersController.signin)
        
    app    
        .route('/users')
        .get(cookieJwtAuth.cookieJwtAuth, usersController.roleDelegation, usersController.getAllUsers)
        .post(cookieJwtAuth.cookieJwtAuth, usersController.usersHandler)

    app
        .route('/createVacancy')
        .get((req, res) => {
            res.render('createVacancy', {root: "./", roleUser: localStorage.getItem('role')})
            cookieJwtAuth.cookieJwtAuth()
        })
        .post(cookieJwtAuth.cookieJwtAuth, vacancyController.createVacancy)

    app
        .route('/viewsVacancy')
        .get(cookieJwtAuth.cookieJwtAuth, vacancyController.getAllVacancy)
        .post(cookieJwtAuth.cookieJwtAuth, vacancyController.changeVacancy)

    app
        .route('/editVacancy')
        .get(cookieJwtAuth.cookieJwtAuth, vacancyController.editVacancy)
        .post(cookieJwtAuth.cookieJwtAuth, vacancyController.editSaveVacancy)

    app
        .route('/viewsResume')
        .get(cookieJwtAuth.cookieJwtAuth, vacancyController.getAllResume)
        .post(cookieJwtAuth.cookieJwtAuth, vacancyController.changeStatusResume, vacancyController.deleteResume)

    app
        .route('/logout')
        .get(usersController.logout)

    app
        .route('/Vacancy')
        .get(guestController.getAllVacancy)
        .post(guestController.redirectVacancy)

    app
        .route('/vacancyForm')
        .get(guestController.renderSelectedVacancy)
        .post(guestController.sendForm)

    app
        .route('/download/:filename')
        .get((req, res) => {
            const filename = req.params.filename;
            res.download(`./uploads/${filename}`);
        });
          
}