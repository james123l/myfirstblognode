const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

const update = async (req, res) => {
    if (!req.params.token) {
        res.status(401).json("Not login.")
        return 
    }
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt);
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                //update 到数据库
                {$set:req.body},
                //更新信息并发送给客户端，否则客户端保持旧的user信息
                {new: true});
            res.status(200).json(updatedUser);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(401).json("You can only update your account.");
    }
}
const get = async (req,res)=>{
        try{
            const user = await User.findById(req.params.id);
            const { password, ...others } = user._doc;
            res.status(200).json(others);
        }catch(err){
            res.status(500).json(err);
        }
}

module.exports = {get,update}