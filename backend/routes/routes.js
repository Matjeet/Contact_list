'use strict'

var express = require('express')
var api = require('../controllers/api')
var token = require('../helpers/token')

var app = express.Router()

app.post('/user/create', api.createUser)
app.post('/user/login', api.logIn)
app.post('/contact/create/:_id', token.validadeUserToken, api.createContact)
app.put('/contact/edit/:_idOwner/:_idContact', token.validadeUserToken, api.editContact)
app.get('/contact/find/:_id', token.validadeUserToken, api.findUserContacts)
app.delete('/contact/delete/:_id', token.validadeUserToken, api.deleteContact)
app.get('/contact/findSpecifict/:id', token.validadeUserToken, api.findSpecificContact)

module.exports = app