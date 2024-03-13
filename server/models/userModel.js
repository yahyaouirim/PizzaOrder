const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const UserSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:[true, 'First name is required'],
        minLength:[3, 'First Name must has at least 3 chars']
    },
    lastName:{
        type:String,
        required:[true, 'Last name is required']
    },
    address:{
        type:String,
        required:[true, 'Address is required']
    },
    city:{
        type:String,
        required:[true, 'City is required']
    },
    
    state:{
        type:String,
        enum:["one", "two", "three"],
        required:[true, 'State is required']
    },
    
    email:{
        type:String,
        required:[true, 'Email is required'],
        validate:[isEmail, 'Invalid Email'],
        unique: true
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        minLength:[8, 'Password must be 8 characters']
    }, 
    numOrder:{
        type:Number,
        default: 0
    }


}, {timestamps:true})

//middlware
UserSchema.virtual('confirmPassword')
    .get(() => this.confirmPassword)
    .set(value => this.confirmPassword = value)

UserSchema.pre('validate', function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Passwords dont match')
    }
    next();
})

// this should go after 
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model('User', UserSchema)