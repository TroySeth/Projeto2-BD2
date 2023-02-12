const {user: userModel, user} = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function create (req, res){
    const {name, username, email, password} = req.body

    try{
        new userModel({
            name,
            username,
            email,
            password
        }).save().then(res.json('usuario criado com sucesso!'))
    } catch(error){
        res.json(error + 'ao criar usuário')
    }
}

module.exports = {create}