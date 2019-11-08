const jwt = require('jsonwebtoken');

const User = require('./models/user.model.js');
const errorHelper = require('./errorHelper');

module.exports = async (req, res, next) => {
	const headers = req.headers.authorization;
	if (!headers) {
		return next(errorHelper('Authorization header not foumd', 'fail', 401));
	}

	const token = headers.split(' ')[1];

	if (!token) {
		return next(errorHelper('Token not found', 'fail', 401));
	}

	const decodedToken = jwt.verify(token, 'secret');

	const user = await User.findById(decodedToken.userId);
	if (!user) {
		return next(errorHelper('User not found', 'fail', 404));
	}

	req.userId = user._id;
	next();
};
