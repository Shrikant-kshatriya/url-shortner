require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db.js');

const app = express();

// Initialize database connection
db();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    withCredentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the URL Shortener API');
});

// Routes
const shortUrlRoutes = require('./routes/shortUrlRoutes.js'); 
app.use('/', shortUrlRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;