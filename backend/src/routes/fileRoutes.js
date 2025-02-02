const express = require("express");
const fileController = require("../controllers/fileController");

const router = express.Router();

router.post("/upload", fileController.uploadFile);
router.post("/list", fileController.getFiles);
router.post("/delete", fileController.deleteFile);

module.exports = router;
