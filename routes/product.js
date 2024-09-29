const express = require("express");
const { Get, GetById, Create, Update, Delete } = require("../controllers/productController");
const router = express.Router();

router.get("/", Get);
router.get("/:id", GetById);
router.post("/", Create);
router.put("/:id", Update);
router.delete("/:id", Delete);

module.exports = router;
