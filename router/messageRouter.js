const express = require("express");
const router = express.Router();
const { saveMessage } = require("../controllers/messageController");
router.post("/saveMessage", saveMessage);
module.exports = router;
