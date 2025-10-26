const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const recetteRouter = require('./routes/recetteRouter');
const ingredientRouter = require('./routes/ingredientRouter');

const app = express();
app.use(cors());
app.use(express.json());

app.use(recetteRouter)
app.use(ingredientRouter)


app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log('Error starting server:', err);
        return;
    } else {
        console.log('Server started successfully on port', process.env.PORT);
    }
});

mongoose.connect(process.env.MONGO_URI)