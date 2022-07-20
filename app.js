const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');
const port = process.env.PORT || '3000';
const path = require('path');
const http = require('http');
const app = express();

dotenv.config();
const config = require('./config');

const apiRouter = require('./routes');

app.use(
  session({
    httpOnly: true,
    secure: true,
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      Secure: true,
    },
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('jwt-secret', config.jwtSecret);
app.use('/api', apiRouter);

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('connected to mongodb server');
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server opened at http://localhost:${port}/`);
});
