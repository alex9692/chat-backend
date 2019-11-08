const Lobby = require('../models/chat-lobby.model.js');
const errorHelper = require('../errorHelper');

exports.createLobby = async (req, res, next) => {
	try {
		const { userId } = req;
		req.body.user = userId;

		const lobby = await Lobby.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				lobby
			}
		});
	} catch (error) {
		return next(errorHelper(error.message));
	}
};

exports.getLobbies = async (req, res, next) => {
	try {
		let filter = {};
		if (req.query.lobbyName) {
			filter = { lobbyName: req.query.lobbyName };
		}
		const lobbies = await Lobby.find(filter).populate('user');

		res.status(200).json({
			status: 'success',
			results: lobbies.length,
			data: {
				lobbies
			}
		});
	} catch (error) {
		return next(errorHelper(error.message));
	}
};
