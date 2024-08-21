const express = require('express');
const morgan = require('morgan');
const app = express();
const connectDB = require('./config/db');

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.json({ extended: true }));

connectDB();


app.use('/user/register',  require('./route/register'));
app.use('/user/getuser', require('./route/getuser'));
app.use('/user/login',  require('./route/login')); 

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
