const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {genHashedPassowrd} = require('../utils/bcrypt');
const { getAuthToken } = require('../utils/jwt');

const updateUser = async (req, res) => {
    try{
        const {id, ...body} = req.body;
        const user = await User.updateOne({id}, body);
        return res.json(user);
    }catch(error){
        res.send(error);
    }
}

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ msg: 'Please enter all details'});
        }

        const userExists = await User.findOne({ email });

        if(userExists){
            return res.status(400).json({ msg: 'User already exists'});
        }

        const hashedPassword = await genHashedPassowrd(password);
        const newUser = new User({ email, password: hashedPassword });
        const user = await newUser.save();
        const token = getAuthToken(user._id);
        user.password = null;
        res.status(201).json({
            data: {...user.toObject(), token },
            msg: 'User created & logged in successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something went wrong'
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ msg: 'Please enter all details'});
        }

        const user = await User.findOne({ email }).lean();

        if(bcrypt.compareSync(password, user.password)){
            const token = getAuthToken(user._id);

            return res.status(200).json({
                msg: 'Logged in successfully',
                data : { token }
            })
        }
        
        res.status(400).json({
            msg: 'Incorrect details'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something went wrong'
        });
    }
}

module.exports = {
    updateUser, login, signup
};