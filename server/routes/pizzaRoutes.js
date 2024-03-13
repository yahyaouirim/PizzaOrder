const PizzaController = require('../controllers/pizzaController')
const { authenticate } = require('../config/jwt.config'); // Import the middleware
 

module.exports = app => {
    app.post('/api/newpizza', authenticate, PizzaController.createNewPizza);
    app.get('/api/onepizza/:id',authenticate, PizzaController.findOnePizza);
    app.get('/api/allpizzas/:userOwner',authenticate, PizzaController.findAllPizza);
    app.get('/api/random',authenticate, PizzaController.getRandomPizza);
    app.patch('/api/updatepizza/:id',authenticate, PizzaController.UpdatePizza);
    app.delete('/api/deletepizza/:id',authenticate, PizzaController.deletePizza);   

}