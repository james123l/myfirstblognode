const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username:{
        type: String,
        unique :true
    },
    roles:{
        type: Array,
    },
    password:{
        type: String,
    }
},{timestamps:true});

module.exports = mongoose.model("Admin",AdminSchema)