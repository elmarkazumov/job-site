'user strict'

module.exports = (app) => {
    const usersController = require('./../Controller/usersController')

    app
        .route('/pages/users')
        .get(usersController.getAllUsers)
    
    app
        .route('/pages/signup')
        .post(usersController.signup)
}