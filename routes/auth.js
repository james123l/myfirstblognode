const router = require("express").Router();
const User = require("../models/User");
// 加密
const bcrypt = require("bcrypt");
const {register, login, oauthLogin , oauthCallback, oauthLogout} = require( "../controllers/auth")
//register
//update-put save-post del-delete request-get
router.post("/register",register);

//login
router.post("/login", login)
router.post("/logout", oauthLogout)
router.get("/oauth", oauthLogin)
router.get("/oauth-callback", oauthCallback)

module.exports = router;