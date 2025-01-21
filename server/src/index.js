require("dotenv").config();
const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors');
const wrestlerRoutes = require('./routes/wrestlerRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/wrestlers', wrestlerRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
    });

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});