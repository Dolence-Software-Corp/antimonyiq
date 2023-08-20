const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ip = require('./ip');
const usersRouter = require('./routes/users.route');
const transactionRoutes = require('./routes/transaction.routes');


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const ignoreUrl = [
    '/',
];

app.use(async (req, res, next) => {
    const url = req.path;
    console.log(url);
    if (ignoreUrl.includes(url)) {
        return next();
    }

    return next();
});

app.get('/', function (req, res) {
    res.json({
        status: 200,
        message: 'AntimonyIQ Website API',
    });
});
app.use('/users', usersRouter);
app.use('/transactions', transactionRoutes);


module.exports = app;
