import express from 'express';
import morgan from 'morgan';
import connectDB from './config/db.js';
import registerRouter from './route/register.js';
import getuserRouter from './route/getuser.js';
import loginRouter from './route/login.js';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

await connectDB();

app.use('/user/register', registerRouter);
app.use('/user/getuser', getuserRouter);
app.use('/user/login', loginRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
