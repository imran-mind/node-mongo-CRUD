const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/convergytics', {
    useNewUrlParser: true
});

console.log("DB connections established")