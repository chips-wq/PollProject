const { default: mongoose } = require("mongoose");


const mongoDBUri = 'mongodb://mongo:27017';

mongoose.connect(mongoDBUri).then(() => console.log("success"));

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
});

const User = new mongoose.model('User', userSchema);

module.exports = User;

