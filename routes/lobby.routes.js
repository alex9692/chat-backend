const express = require('express');
const router = express.Router();

const lobbyController = require('../controllers/lobby.controller.js');
const authMiddleware = require('../authMiddleware');
const messageRouter = require('./message.routes.js');

router.use('/:roomId/messages', messageRouter);

router
	.route('/')
	.get(lobbyController.getLobbies)
	.post(authMiddleware, lobbyController.createLobby);

module.exports = router;
