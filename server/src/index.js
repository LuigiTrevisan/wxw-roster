require("dotenv").config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const wrestlerRoutes = require('./routes/wrestlerRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');
const { uploadFile, getFile } = require('./config/upload');
const fs = require('fs');

const app = express();

connectDB();

app.use(cors());
app.use(express.json({ limit: '200mb', extended: true}));
app.use(express.urlencoded({extended: true}));
app.use('/wrestlers', wrestlerRoutes);
app.use('/image', uploadRoutes);
app.use('/login', authRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});