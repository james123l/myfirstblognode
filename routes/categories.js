const router = require("express").Router();
const {save, find} = require( "../controllers/categories")
export {}

router.post("/", save);

router.get("/", find);

module.exports = router;