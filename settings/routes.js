'user strict'

module.exports = (app) => {
    const usersController = require('./../Controller/usersController')

    app
        .route('/pages/users')
        .get(usersController.getAllUsers)
    
    app
        .route('/pages/registration')
        .post(usersController.signup)

    app
        .route('/pages/login')
        .get(usersController.signin)
}