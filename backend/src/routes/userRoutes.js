const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/:userId", userController.getUserData);

module.exports = router;
