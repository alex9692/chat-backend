const mongoose = require('mongoose');

const lobbySchema = new mongoose.Schema(
	{
		lobbyName: {
			type: String,
			required: true
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Lobby', lobbySchema);
