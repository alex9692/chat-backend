const Message = require('../models/message.model');
const errorHelper = require('../errorHelper');

exports.createMessage = async (req, res, next) => {
	try {
		const { userId } = req;
		const { roomId } = req.params;
		req.body.user = userId;
		req.body.lobby = roomId;
		const message = await Message.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				message
			}
		});
	} catch (error) {
		return next(errorHelper(error.message));
	}
};

exports.getMessages = async (req, res, next) => {
	try {
		let filter = {};
		if (req.params.roomId) {
			filter = { lobby: req.params.roomId };
		}
		const messages = await Message.find(filter)
			.populate('user')
			.populate('lobby');

		res.status(200).json({
			status: 'success',
			results: messages.length,
			data: {
				messages
			}
		});
	} catch (error) {
		return next(errorHelper(error.message));
	}
};
