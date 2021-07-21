const express = require('express');
const debug = require('debug')('app');
const chalk = require('chalk');
const morgan = require('morgan');
const shortRouter = require('./routers/short_router.js');
const db = require('./config/db.js');
require('dotenv').config('.env');
const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Conectarea la baza de date
db.connectDB();

//Routing pentru request-ul de scurtare a unui link
app.use('/api/urls', shortRouter);

app.listen(process.env.PORT, () => {
    debug(`Listening on port ${chalk.green(process.env.PORT)}`);
});