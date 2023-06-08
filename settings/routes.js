'user strict'

const { user } = require('../config')

module.exports = (app) => {
    const usersController = require('./../Controller/usersController')
    const userFunctional = require('../Controller/vacancyController')
    const guestController = require('../Controller/guestController')
    const cookieJwtAuth = require('../middleware/cookieJwtAuth')

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
            res.render('createVacancy', {root: "./"})
            cookieJwtAuth.cookieJwtAuth()
        })
        .post(cookieJwtAuth.cookieJwtAuth, userFunctional.createVacancy)

    app
        .route('/viewsVacancy')
        .get(cookieJwtAuth.cookieJwtAuth, userFunctional.getAllVacancy)
        .post(cookieJwtAuth.cookieJwtAuth, userFunctional.changeVacancy)

    app
        .route('/editVacancy')
        .get(cookieJwtAuth.cookieJwtAuth, userFunctional.editVacancy)
        .post(cookieJwtAuth.cookieJwtAuth, userFunctional.editSaveVacancy)

    app
        .route('/viewsResume')
        .get(cookieJwtAuth.cookieJwtAuth, userFunctional.getAllResume)
        .post(cookieJwtAuth.cookieJwtAuth, userFunctional.changeStatusResume)

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
}