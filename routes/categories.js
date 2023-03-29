const router = require("express").Router();
const {find, save, update, deleteCat} = require( "../controllers/categories")

router.post("/", save);

router.get("/", find);
router.put('/', update);
router.delete('/', deleteCat);
module.exports = router;