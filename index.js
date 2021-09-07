require('dotenv').config();
const express = require('express');
const fileUpdload = require('express-fileupload');
const path = require('path');

require('./models/models');
const db = require('./db');
const indexRouter = require('./routes/indexRouter');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(fileUpdload());
app.use(express.static(path.join(__dirname,'static')));
app.use('/api', indexRouter);

const start = async() => {
    await db.authenticate();
    await db.sync();

    app.listen(PORT, () => {
        console.log(`server has been started on ${PORT}`);
    });
}

start();