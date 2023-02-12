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

async function signin (req, res){
    const {username, password} = req.body

    const user = await userModel.findOne({username: username})
    if(!user){
        return res.status(422).json('usuário não encontrado!')
    }
    const checkPassword = password == user.password
    if(!checkPassword){
        return res.status(422).json('Senha inválida!')
    }
    res.json(username + ' está logado!')
}

async function isAuthenticated (req, res, next){
    const { access_token } = req.cookies
    if(access_token){
        try{
            const [, token] = access_token.split(' ')
            await jwt.verify(token, process.env.SECRET)

            return next()
        } catch(e){
            //req.session.user = null
            return res.redirect('/signin')
        }
    } else{
        //req.session.user = null
        return res.redirect('/signin')
    }
}

module.exports = {create, signin}