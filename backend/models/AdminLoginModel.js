// models/AdminModel.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Add other fields as needed
});

module.exports = mongoose.model('Adminlogin', AdminSchema);
