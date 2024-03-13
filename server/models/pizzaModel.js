const mongoose = require('mongoose');

const PizzaOrderSchema = new mongoose.Schema({
    method:
    {
        type: String,
        required: [true, "{PATH} is required"],
        enum: ["CarryOut", "Delivery"]
    },
    size:
    {
        type: String,
        required: [true, "{PATH} is required"],
        enum: ["Small", "Meduim", "Large"]
    },
    crust:
    {
        type: String,
        required: [true, "{PATH} is required"],
        enum: ["ThinCrust", "Regular", "ThickCrust"]
    },
    quantity:
    {
        type: Number,
        required: [true, "{PATH} is required"],
        default: "1"
    },
    toppings:
    {
        type: Array,

        required: [true, "{PATH} must at least choose one topping"]
    },
    userOwner:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isPurchased:
    {
        type: Boolean,
        default: false
    },
    crustPrice:
    {
        type: Number,
        default: function () {
            let price = 0;
            if (this.crust === "ThinCrust") price += 2;
            else if (this.crust === "Regular") price += 3;
            else if (this.crust === "ThickCrust") price += 3;
            return price;
        }
    },
    methodPrice: {
        type: Number,
        default: function () {
            let price = 0;
            if (this.method === "CarryOut") price += 3;
            else if (this.method === "Delivery") price += 5;
            return price;
        }
    },
    sizePrice:{
        type: Number,
        default: function () {
            let price = 0;
            if (this.size === "Small") price += 2;
            else if (this.size === "Medium") price += 3;
            else if (this.size === "Large") price += 4;
            return price;
        }
    },
    toppingsPrice: {
        type: Number,
        default: function () {
            let price = 0;
            this.toppings.forEach((topping) => {
                if (this.topping === "Pepperoni") price += 3;
                else if (this.topping === "Pineapple") price += 3;
                else if (this.topping === "Chiken") price += 3;
                else if (this.topping === "Extracheese") price += 3;
                else if (this.topping === "Onions") price += 1;
                else if (this.topping === "Olives") price += 1;
                else if (this.topping === "Sausage") price += 2;
                else if (this.topping === "Mushrooms") price += 2;

                return price;
            });
        }
    },

    totalPrice:
    {
        type: Number,
        default: function () {
            let price = 0;
            price += this.methodPrice;
            price += this.sizePrice;
            price += this.crustPrice;
            price *= this.quantity;
            return price;

        }
    },
    Pricetax:
    {
        type: Number,
        default: function () {
            return this.totalPrice + this.totalPrice * 0.19;
        }
    },

    isFavorite:
        { type: Boolean, default: false },

}, { timestamps: true });

module.exports = mongoose.model('PizzaOrder', PizzaOrderSchema);