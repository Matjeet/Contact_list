'use strict'

var user = require('../models/user')
var contact = require('../models/contact')
var token = require('../helpers/token')
var bcrypt = require('bcryptjs')

function createUser(req, resp){
    var newUser = new user()
    var content = req.body

    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(content.password, salt)

    newUser.name = content.name
    newUser.lastName = content.lastName
    newUser.email = content.email
    newUser.password = hash
    newUser.gender = content.gender

    newUser.save().then(
        (savedUser) => {
            resp.status(200).send({createdUser: savedUser})
        },
        (err) => {
            resp.status(500).send(err)
        }
    )
}
function logIn(req, resp){
    var content = req.body

    user.findOne({email: content.email}).then(
        (foundUser) => {
            if(foundUser == null){
                resp.status(403).send({message: 'Correo incorrecto'})
            }
            else{
                if(bcrypt.compareSync(content.password, foundUser.password)){
                    resp.status(200).send({message: 'Inicio de sesión correcto', token: token.getUserToken(foundUser), userId: foundUser._id})
                }
                else{
                    resp.status(403).send({message: 'Contraseña incorrecta'})
                }
            }
        },
        (err) => {
            resp.status(500).send({message: 'No se pudo buscar en el servidor', error: err})
        }
    )
}
function createContact(req, resp){
    var newContact = new contact()
    var content = req.body

    newContact.name = content.name
    newContact.lastName = content.lastName
    newContact.email = content.email
    newContact.gender = content.gender
    newContact.phoneNumber = content.phoneNumber
    newContact.owner = req.params._id

    newContact.save().then(
        (savedContact) => {
            resp.status(200).send({createdContact: savedContact})
        },
        (err) => {
            resp.status(500).send(err)
        }
    )
}
function editContact(req, resp){
    var contactToEdit = new contact()
    var content = req.body

    contactToEdit._id = req.params._idContact
    contactToEdit.name = content.name
    contactToEdit.lastName = content.lastName
    contactToEdit.email = content.email
    contactToEdit.gender = content.gender
    contactToEdit.phoneNumber = content.phoneNumber

    console.log(contactToEdit)

    contact.find({owner: req.params._idOwner}).then(
        (ownerContacts) => {
            if(ownerContacts == null){
                resp.status(403).send({message: 'El usuario no tiene contectos'})
            }
            else{
                contact.findOneAndUpdate(contactToEdit._id, contactToEdit, {new: true}).then(
                    (editedContact) => {
                        resp.status(200).send(editedContact)
                    },
                    (err) => {
                        resp.status(500).send({message: 'No se pudo editar el contacto', error :err})
                    }
                )
            }
        },
        (err) => {
            resp.status(500).send({message: 'No se pudo buscar los contactos del usuario', error: err})
        }
    )
}
function findUserContacts(req, resp){
    var ownerId = req.params._id

    contact.find({owner: ownerId}).then(
        (userContacts) => {
            resp.status(200).send(userContacts)
        },
        (err) => {
            resp.status(500).send(err)
        }
    )
}
function deleteContact(req, resp){
    var contactToDelete = new contact()

    contactToDelete.name = req.params.name

    contact.findOneAndDelete(contactToDelete.name).then(
        (deletedContact) =>{
            resp.status(200).send({deletedContact: deletedContact})
        },
        (err) => {
            resp.status(500).send({message: 'No se pudo eliminar el contacto'})
        }
    )
}
function findSpecificContact(req, resp){
    var contactId = req.params.id

    contact.findById(contactId).then(
        (foundContact) => {
            resp.status(200).send(foundContact)
        },
        (err) => {
            resp.status(500).send(err)
        }
    )
}
module.exports = {
    createUser,
    logIn,
    createContact,
    editContact,
    findUserContacts,
    deleteContact,
    findSpecificContact
}