module.exports = (message, status, statusCode) => {
	const err = new Error(message);
	err.status = status;
	err.statusCode = statusCode;
	return err;
};
