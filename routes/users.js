const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
// 加密
const bcrypt = require("bcrypt");
const {update, deleteU, get} = require( "../controllers/users");

//update-put save-post del-delete request-get
router.put("/:token", update);

router.delete("/:token", deleteU );


//get user
router.get("/:token", get);
module.exports = router;