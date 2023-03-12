const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require('uuid');

const register = async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        // 加密加盐
        const hashedPass = await bcrypt.hash(req.body.password,salt)
        // 等价const newUser = new User(req.body);
        const newUser = new User({
            username: req.body.username,
            email:req.body.email,
            password:hashedPass
        });
        const { user , _id} = await newUser.save();
        user.token = _id;
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
}

const login = async (req,res)=>{
    try{
        const user = await  User.findOne({username: req.body.username});
        !user && res.status(400).json("No such user.");
        const validate = await bcrypt.compare(req.body.password,user.password);
        !validate && res.status(400).json("Wrong password.");
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
            const body = {
                client_id: process.env.GITHUB_OAUTH_ID, // 必须
                client_secret: process.env.GITHUB_OAUTH_SECRET, // 必须
                code: req.query.code // 必须,这个不用我们填写，当授权跳转后，会在/oauth-callback 自动添加code
            };
            const response = await axios.post(
                `https://github.com/login/oauth/access_token`,
                body
            );
            // 获取token
            const token = response.data.split("&")[0].substring(13);
            // 获取用户信息
            const emailRes = await axios({
                method: "get",
                url: "https://api.github.com/user/emails",
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `token ${token}`
                }
            });
            //获取email
            let email;
            emailRes.data.map((emailInfo) => {
                if (emailInfo.primary) {
                    email = emailInfo.email;
                }
            });
            //执行email登陆逻辑， 但是不需要密码
            if (email) {
                const user = await User.findOne({ email: email });
                if (user) {
                    console.log("User exist o auth");
                    res.status(200).json({ token: user._id });
                } else {
                    console.log("User not exist o auth");
                    let newUser = new User({
                        email: email
                    });
                    let oauthSavedUser = await newUser.save();
                    console.log("Oauth new user created");
                    res.status(200).json({token:oauthSavedUser._id});
                }
            } else {
                res.status(401).send("Bad Credential. OAUTH AUTHORITY NOT ENOUGH TO GET EMAIL.");
            }
        }
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

module.exports ={login, oauthLogin, oauthCallback, register, generateRestToken}