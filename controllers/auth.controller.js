const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const errorHelper = require('../errorHelper');

exports.signUp = async (req, res, next) => {
	try {
		console.log(req.body);
		const user = await User.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				user
			}
		});
	} catch (err) {
		return next(errorHelper(err.message));
	}
};

exports.signIn = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });

		if (
			!user ||
			!(await user.comparePasswords(req.body.password, user.password))
		) {
			return next(errorHelper('Incorrect username or password.Try again!'));
		}

		const token = jwt.sign(
			{
				userId: user._id
			},
			'secret',
			{ expiresIn: 60 * 60 }
		);

		user.password = undefined;

		res.status(200).json({
			status: 'success',
			data: {
				token,
				userId: user._id
			}
		});
	} catch (error) {
		next(errorHelper(error.message));
	}
};

exports.getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return next(errorHelper('user not found', 'fail', 404));
		}
		res.status(200).json({
			status: 'success',
			data: {
				user
			}
		});
	} catch (error) {
		return next(errorHelper(error.message));
	}
};
