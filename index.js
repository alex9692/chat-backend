const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('./socket.io');
const errorController = require('./controllers/error.controller.js');
const userRouter = require('./routes/auth.routes.js');
const lobbyRouter = require('./routes/lobby.routes.js');
const messageRouter = require('./routes/message.routes.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/lobby', lobbyRouter);
app.use('/api/v1/chat', messageRouter);

app.use(errorController);

mongoose
	.connect('mongodb://localhost:27017/chat-app', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('connected to database');
	})
	.catch(err => console.log(err));

const PORT = 5000;
app.listen(PORT, () => {
	console.log('server listening in PORT: ', PORT);
});
