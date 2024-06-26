const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true, minLength: 4, unique: true },
    password: { type: String, required: true }
});

// Register the User model with Mongoose
const UserModel = model('User', UserSchema);

module.exports = UserModel;


