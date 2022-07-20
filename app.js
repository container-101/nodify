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

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.join(__dirname, '.env.production') });
} else if (process.env.NODE_ENV === 'develop') {
  dotenv.config({ path: path.join(__dirname, '.env.develop') });
}

const indexRouter = require('./routes');

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
app.set('jwt-secret', process.env.JWT_SECRET);
app.use('/api', indexRouter);

mongoose.connect(process.env.MONGO_URI, {
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
