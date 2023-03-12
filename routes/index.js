const authRoute = require("./auth");
const userRoute = require("./users");
const postRoute = require("./posts");
const catagoriesRoute = require("./categories");
const router = require("express").Router()
const docRoute = require("./swagger")

router.use("/auth",authRoute);
router.use("/users",userRoute);
router.use("/posts",postRoute);
router.use("/categories", catagoriesRoute);
router.use("/api-docs",docRoute);

module.exports = router