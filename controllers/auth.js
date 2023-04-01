const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require('uuid');

const register = async (req,res)=>{
    try {
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            res.status(400).json({ message: 'username already exists' });
            return
        }
        const salt = await bcrypt.genSalt(10);
        // 加密加盐
        const hashedPass = await bcrypt.hash(req.body.password,salt)
        // 等价const newUser = new User(req.body);
        const newUser = new User({
            username: req.body.username,
            email:req.body.email,
            password:hashedPass
        });
        const  user = await newUser.save();
        user.token = user._id;
        res.status(200).json(user);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

const login = async (req,res)=>{
    try{
        const user = await  User.findOne({email: req.body.email});
        if (!user) {
            res.status(400).json("No such user.");
            return;
        } 
        const validate = await bcrypt.compare(req.body.password,user.password);
        if (!validate) {
            res.status(400).json("Wrong password.");
            return;
        }
        // 不给用户端发送 password
        const {password, _id, ...others} = user._doc;
        others.token = _id;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
}

const axios = require("axios");

const oauthLogin = (req, res) => {
    console.log("oauth")
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_OAUTH_ID}&redirect_uri=${process.env.GITHUB_OAUTH_DOMAIN}/auth/oauth-callback&scope=user:email`);
};

const oauthCallback = async (req ,res) => {
    try {
        if (!req.query.code) {
            res.status(401).send("Unauthorized, access denied.");
        } else {
            res.status(200).send({token: uuid.v4()});
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

const oauthLogout = async (req ,res) => {
    try {
        res.status(200).send();
    } catch (e) {
        res.status(500).send(e);
    }
};

const generateRestToken =  function (payload) {
    const token = jwt.sign({payload}, "secretkey", {
        expiresIn: 60 * 60 * 365 * 24 ,
    });
    console.log(payload, "Token generated", token)
    return token
};

module.exports ={login, oauthLogin, oauthCallback, register, generateRestToken, oauthLogout}