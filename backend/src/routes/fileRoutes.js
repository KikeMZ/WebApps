const express = require("express");
const fileController = require("../controllers/fileController");

const router = express.Router();

router.post("/upload/:userId", fileController.uploadFile);
router.get("/list/:userId", fileController.getFiles);
router.post("/delete/:userId/:fileId", fileController.deleteFile);

module.exports = router;
