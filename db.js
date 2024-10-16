const mongoose = require('mongoose');
require('dotenv').config();

// It's better to use environment variables for sensitive information
// const mongoUrl = 'mongodb+srv://123divu123:123divu123@cluster0.filv5g7.mongodb.net/mydatabase';
 const mongoUrl='mongodb+srv://divyarathorestratavarintern:123divu123@cluster0.ds0ss.mongodb.net/mydatabase'
const url=process.env.DB_URL;
mongoose.connect(mongoUrl)
.then(() => {
    console.log("Database is connected");
})
.catch((error) => {
    console.error("Database connection error:", error);
});

const db = mongoose.connection;
module.exports = db;
