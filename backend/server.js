const express = require('express');
const path = require('path');
const rootRouter = require('./routes/root');
const { logger, logEvent } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const app = express();
require('dotenv').config();
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

console.log(process.env.NODE_ENV);

connectDB();

// custom middleware logger
app.use(logger);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//built-in middleware to handler urlencoded data
// in other words, form data:
// 'content-type': application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// Middleware for cookies
app.use(cookieParser());
// Use the root router
app.use('/', rootRouter);
app.use('/users', require('./routes/userRoutes'));
app.use('/services', require('./routes/serviceRoutes'));

// Must be placed after the router call above
//serve static files, In this case from the Public Folder
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});
app.use(errorHandler);

// To let nodemon know you want it to execute this server.js file we run:
// nodemon --exec "node server.js"

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDb');

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  mongoose.connection.on('error', (err) => {
    console.log(err);
    //
    if (err.hasOwnProperty('code')) {
      console.log('code:', err.code);
    }

    if (err.hasOwnProperty('syscall')) {
      console.log('syscall:', err.syscall);
    }

    if (err.hasOwnProperty('hostname')) {
      console.log('hostname:', err.hostname);
    }
    //
    logEvent(
      `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
      'mongoErrLog.log'
    );
  });
});
