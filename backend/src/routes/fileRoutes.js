const express = require("express");
const fileController = require("../controllers/fileController");

const router = express.Router();

router.post("/upload/:userId", fileController.uploadFile);
router.get("/list/:userId", fileController.getFiles);
router.delete("/delete/:userId/:fileId", fileController.deleteFile);
router.put("/update/:userId/:fileId", fileController.updateFile);
router.get("/download/:fileId", fileController.urlDownload);
router.get("/storage/:userId", fileController.getStorage);

module.exports = router;
