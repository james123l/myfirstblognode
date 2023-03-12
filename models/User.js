const mongoose = require('mongoose');

// 定义user类型规则
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        unique :true
    },
    email:{
        type: String,
        required:true,
        unique :true
    },
    password:{
        type: String,
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true});

module.exports = mongoose.model("User",UserSchema)