'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "$@p6zFJb#n8s^E9";

function getUserToken(user){
    var payload = {
        sub: user._id,
        name: user.name,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(24, 'hours').unix()
    };
    return jwt.encode(payload, secret);
}

function validadeUserToken(req, resp, nextStep){
    try{
        var tokenSentByUser = req.headers.authorization;
        var cleanToken = tokenSentByUser.replace("Bearer ",  "");
        var payload = jwt.decode(cleanToken, secret);
        req.header.userId = payload.sub;
        nextStep();
    }
    catch(ex){
        resp.status(403).send({message:"Token Inválido"});
    }
}

module.exports = {
    getUserToken,
    validadeUserToken
}