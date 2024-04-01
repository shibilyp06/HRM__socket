const express = require("express");
const router = express.Router();
const {
  saveMessage,
  getMessages,
} = require("../controllers/messageController");
router.post("/saveMessage", saveMessage);
router.get("/getMessages", getMessages);

module.exports = router;
