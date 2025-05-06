const express = require('express');

require('dotenv').config();

const mongoose = require('mongoose');

const app = express();

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err);
        return;
    }else {
        console.log('Server started successfully on port', process.env.PORT);
    }
});