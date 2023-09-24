const mongoose = require('mongoose');


const user_signup = new mongoose.Schema({

    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },

})

const model = mongoose.model('user_data_collection', user_signup);

module.exports = model;