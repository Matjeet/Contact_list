'use strict'

var mongoose = require('mongoose')

var Schema = mongoose.Schema

var UserSchema = Schema({
    name: String,
    lastName: String,
    email: String,
    gender: String,
    phoneNumber: Number,
    owner: {
        type: mongoose.Types.ObjectId, 
        ref: 'users'
    }
})

module.exports = mongoose.model('contacts', UserSchema)