const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true
		},
		password: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

userSchema.pre('save', async function(next) {
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

userSchema.methods.comparePasswords = async function(
	inputPassword,
	userPassword
) {
	return await bcrypt.compare(inputPassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);
