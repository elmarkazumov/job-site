'user strict'

const { user } = require('../config')

module.exports = (app) => {
    const usersController = require('./../Controller/usersController')
    const userFunctional = require('../Controller/vacancyController')
    const guestController = require('../Controller/guestController')
    const passport = require('passport')

    // app
    //     .route('/api/users')
    //     .get(passport.authenticate('jwt', { session: false }), usersController.getAllUsers)
        // passport.authenticate('jwt', { session: false }),
    app    
        .route('/users')
        .get(usersController.getAllUsers)
        .post(usersController.usersHandler)
    
    app
        .route('/login')
        .get((req, res) => {
            res.render('login', {root: "./"})
        })
        .post(usersController.signin)

    app
        .route('/createVacancy')
        .get((req, res) => {
            res.render('createVacancy', {root: "./"})
        })
        .post(userFunctional.createVacancy)

    app
        .route('/viewsVacancy')
        .get(userFunctional.getAllVacancy)
        .post(userFunctional.changeVacancy)

    app
        .route('/editVacancy')
        .get(userFunctional.editVacancy)
        .post(userFunctional.editSaveVacancy)

    app
        .route('/Vacancy')
        .get(guestController.getAllVacancy)
        .post(guestController.redirectVacancy)

    app
        .route('/vacancyForm')
        .get(guestController.renderSelectedVacancy)
        .post(guestController.sendForm)

    app
        .route('/viewsResume')
        .get(userFunctional.getAllResume)
        .post(userFunctional.changeStatusResume)
}