const express = require('express');
const middleware = require('./middleware/middleware')
const cors= require('cors')
const server = express();
const userRouter = require('./users/users-router')

server.use(express.json())
server.use(cors())
// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.use("/api/users", userRouter );

server.get('/', middleware.logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
