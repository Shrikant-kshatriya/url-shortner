require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db.js');

const port = process.env.PORT || 4000;

const app = express();

// Initialize database connection
db();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',  
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});
const shortUrlRoutes = require('./routes/shortUrlRoutes.js'); 
app.use('/', shortUrlRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app; 