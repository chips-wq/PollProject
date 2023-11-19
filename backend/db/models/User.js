const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: { type: String, match: [/.*gmail.com/, "Email-ul nu se termina in gmail.com"], unique: false, required: true },
    password: { type: String, required: true, minlength: [8, "Parola trebuie sa aiba cel putin 8 caractere."], maxlength: [32, "Parola trebuie sa aiba cel mult 32 de caractere."] },
    created: { type: Date, default: Date.now() }
});

const User = new mongoose.model('User', userSchema);

module.exports = User
