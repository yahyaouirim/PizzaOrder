const UserController = require('../controllers/userController')
const { authenticate  } = require('../config/jwt.config'); // Import the middleware

module.exports = app => {
    app.post('/api/register', UserController.registerUser)
    app.post('/api/login', UserController.loginUser)
    app.post('/api/logout', UserController.logout)
    app.get('/api/user/:id', authenticate, UserController.getLoggedUser);
    app.patch('/api/updateUser/:id', authenticate, UserController.updateUser);

}