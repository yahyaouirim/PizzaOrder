const User = require('../models/userModel');
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
module.exports = {
    registerUser: async (req, res) => {
        try {
            const potentialUser = await User.findOne({ email: req.body.email })
            if (potentialUser) {
                res.status(400).json({ message: 'That email already exists. Please log in.' });
            } else {
                const newUser = await User.create(req.body);
                const userToken = jwt.sign({_id:newUser._id, email: newUser.email}, secret, { expiresIn: '5h' });
                console.log("this is the user token for register \\\\", userToken);
                res.status(201).cookie("userToken", userToken, { httpOnly: true, maxAge: 5 * 60 * 60 * 1000}).json(newUser);
            }
        } catch (err) {
            res.status(400).json({ error: err });
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                const passwordsMatch = await bcrypt.compare(req.body.password, user.password);
                if (passwordsMatch) {
                    const userToken = jwt.sign({_id: user._id}, secret, { expiresIn: '5h' });
                    console.log("+++++++++this is the user token for login  +++ ", userToken);
                    res.status(201).cookie("userToken", userToken, { httpOnly: true, maxAge: 5 * 60 * 60 * 1000 }).json(user);
                } else {
                    res.status(400).json({ message: 'Invalid password' });
                }
            } else {
                res.status(400).json({ message: 'Invalid email. Please register first.' });
            }
        } catch (err) {
            res.status(400).json({ error: err });
        }
    },

    logout: (req, res) => {
        try{
            res.clearCookie('userToken') ;
            res.status(200).json({ message: 'You logged out.' } )   }
        catch(err){
            res.status(400).json({ error: err });
        }
    },
    getLoggedUser: async (req,res)=> {
        try{
            const user= await  User.findById({_id: req.params.id})
            res.status(200).json(user)
        }
        catch(err){
            res.status(400).json(err)
        }
    },
    // update user
    updateUser : async (req, res) => {
        try{
            const user =await User.findOneAndUpdate({_id: req.params.id }, req.body, { new: true, runValidators: true })
            res.status(200).json(user)
        }
        catch(err ){
            res.status(400).json(err)
        }  
        }
};
