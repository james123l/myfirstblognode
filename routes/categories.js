const router = require("express").Router();
const {save, find} = require( "../controllers/categories")

router.post("/", save);

router.get("/", find);

module.exports = router;