const mongoose = require('mongoose');
require('dotenv').config();
// Defined mongodb URL 

// const mongoURL_LOCAL = process.env.MONGODB_URL
const mongoURL = process.env.MONGODB_URL

// Set up MongoDB connection
mongoose.connect(mongoURL)

// Set default connection
const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server')
})
db.on('error', (err) => {
    console.log('MongoDB connection error', err)
})
db.on('disconnected', () => {
    console.log('MongoDB disconnected')
})

module.exports = db