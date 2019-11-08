const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
	{
		message: {
			type: String,
			required: true
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		lobby: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Lobby'
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
