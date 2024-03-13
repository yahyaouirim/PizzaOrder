const PizzaOrder = require('../models/pizzaModel');
module.exports={
    // READ ALL
findAllPizza : async(req, res) => {
    const id= req.params.userOwner;
    try{ 
        const pizzas= await PizzaOrder.find({userOwner:id}).populate("userOwner");
                console.log(">>>Pizza.find()  >>>", pizzas);
                res.status(200).json(pizzas);
        }
    catch(err){
                res.status(400).json(err)
            }
    },
    // READ ONE 
findOnePizza : (req, res) => {
    PizzaOrder.findOne({ _id: req.params.id })
            .then(oneSinglPizza => {
                res.status(200).json(oneSinglPizza)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    },
    //deletePizza
    deletePizza : (req, res) => {
        PizzaOrder.findOneAndDelete({ _id: req.params.id })
                .then((res) => {
                    res.status(200).json({message:"pizza deleted"})
                })
                .catch(err => {
                    res.status(400).json(err)
                })
        },
        //updatePizza
    UpdatePizza : (req, res) => {
            PizzaOrder.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
                    .then(oneSinglPizza => {
                        res.status(200).json(oneSinglPizza)
                    })
                    .catch(err => {
                        res.status(400).json(err)
                    })
            },
    
    
    // CREATE NEW PIZZA
    createNewPizza : (req, res) => {
    PizzaOrder.create(req.body)
            .then((onePizza) => {
                console.log(">>>Pizza.create()= >>>", onePizza)
                res.status(200).json(onePizza)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    },
    //GET FAVORITE PIZZA
    // getFavoritePizza : (req, res) => {
    //     PizzaOrder.findOne({ _id: req.params.id }).populate({path:'userOwner', match: { isFavorite: { $isf: true }}, select:{'method','size', 'crust', 'quantity', 'toppings' }})
    //             .then((onePizza) => {
    //                 console.log(">>>Pizza.create()= >>>", onePizza)
    //                 res.status(200).json(onePizza)
    //             })
    //             .catch((err) => {
    //                 res.status(400).json(err)
    //             })
    //     },
    // GET FAVORITE PIZZA
    getFavoritePizza: (req, res) => {
        PizzaOrder.find({ userOwner: req.params.id, isFavorite: true })
            .then((favoritePizzas) => {
                console.log(">>>Favorite Pizzas >>>", favoritePizzas);
                res.status(200).json(favoritePizzas);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    // GET RANDOM PIZZA
    getRandomPizza: (req, res) => {
        PizzaOrder.aggregate([{ $sample: { size: 1 } }])
            .then((randomPizza) => {
                console.log(">>>Random Pizza >>>", randomPizza[0]);
                res.status(200).json(randomPizza[0]);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    }
    

        
}
