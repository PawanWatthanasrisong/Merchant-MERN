import express from "express";
import User from '../models/userModel.js';
import bcrypt from 'bcrypt'
import { generateToken } from "../util.js";

const userRouter = express.Router();

const salt = 10;

userRouter.post('/signin', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)){
                res.send( {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).send({ message: 'Invalid email or password'});
    }
    catch(error) {
        console.log(error)
        res.status(500).send(error.message);
    }
})

userRouter.post('/signup', async(req,res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email:req.body.email,
            password: bcrypt.hashSync(req.body.password, salt),
        });
        const user = await newUser.save();
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
})

export default userRouter;
