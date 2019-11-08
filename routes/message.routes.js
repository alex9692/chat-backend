const express = require('express');
const router = express.Router({ mergeParams: true });

const messageController = require('../controllers/message.controller.js');
const authMiddleware = require('../authMiddleware');

router
	.route('/')
	.get(messageController.getMessages)
	.post(authMiddleware, messageController.createMessage);

module.exports = router;
