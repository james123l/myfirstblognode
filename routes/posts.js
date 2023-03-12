const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
// 加密
const bcrypt = require("bcrypt");
const {  findById, deleteP, add, findAll, update}  = require( "../controllers/posts");

//create new post
router.post("/:token",add );

//update put
router.put("/:token",update)

//delete post
router.delete("/:token",deleteP)

//GET POST
router.get("/:token", findById);

//GET ALL POSTS
router.get("/", findAll);

module.exports = router;