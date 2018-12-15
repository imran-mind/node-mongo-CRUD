const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
console.log("DB connections established")