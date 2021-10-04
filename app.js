const express = require('express');
const debug = require('debug')('app');
const chalk = require('chalk');
const morgan = require('morgan');
const shortRouter = require('./routers/short_router.js');
const redirectRouter = require('./routers/redirect_router.js');
const db = require('./config/db.js');
require('dotenv').config('.env');
const app = express();
const cors = require('cors');

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: `${process.env.ORIGIN}`,
    optionsSuccessStatus: 200
}))

//Conectarea la baza de date
db.connectDB();

//Routing pentru request-ul de scurtare a unui link
app.use('/api/urls', shortRouter);

//Routing pentur redirectionarea request-urilor cu link-uri scurtate
app.use('/', redirectRouter);

app.listen(process.env.PORT, () => {
    debug(`Listening on port ${chalk.green(process.env.PORT)}`);
});