const express = require('express');
require('dotenv').config();

require('./models/models');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 8080;

const start = async() => {
    await db.authenticate();
    await db.sync();

    app.listen(PORT, () => {
        console.log(`server has been started on ${PORT}`);
    });
}

start();


app.use(express.json());