const express = require('express');
const router = express.Router();

const download_controller = require("../controllers/download_controller");

router.get("/",download_controller.downloadableFile);

module.exports = router;