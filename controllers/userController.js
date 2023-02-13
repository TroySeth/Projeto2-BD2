const {user: userModel, user} = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const {sessionAura} = require('../db/db');

async function create (req, res){
    const {name, username, email, password} = req.body;
    const haveEmail = await userModel.findOne({email: email});
    const haveUser = await userModel.findOne({username: username});

    if(haveEmail){
        return res.status(422).json('Email já cadastrado, tente com outro email!');
    }
    if(haveUser){
        return res.status(422).json('Usuário já existe, tente com outro usuário!');
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    try{
        new userModel({
            name: name,
            username: username,
            email: email,
            password: passwordHash
        }).save().then(res.redirect('/'));
        try {
            const person = req.body;
            const createNode = await sessionAura.run(`CREATE (p: Person{username: '${person.username}'})`);
        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        }
    } catch(error){
        res.json("Erro ao criar usuário" + error);
    }
}

async function signin (req, res){
    const {username, password} = req.body

    const user = await userModel.findOne({username: username})
    if(!user){
        return res.status(422).json('usuário não encontrado!')
    }
    const checkPassword = await bcrypt.compare(password, user.password)
    if(!checkPassword){
        return res.status(422).json('Senha inválida!')
    }
    
    try{
        const secret = process.env.SECRET;
        const token = jwt.sign({
            id: user.id,
            expiresIn: 3600
        },
        secret
    )
        const tokenBearrer = `Bearer ${token}`;

        req.session.user = user;

        res.cookie('token_acesso', tokenBearrer, { maxAge: 3600000});
        res.redirect('/notes');
    } catch(error){
        res.status(422).json('Autenticação não funcionou');
    }
}

async function signout (req, res){
    req.session.destroy();
    res.clearCookie('token_acesso');
    res.redirect('/');
}

async function isAuthenticated (req, res, next){
    const { token_acesso } = req.cookies;
    if(token_acesso){
        try{
            const [, token] = access_token.split(' ');
            await jwt.verify(token, process.env.SECRET);

            return next();
        } catch(e){
            req.session.user = null;
            return res.redirect('/notes');
        }
    } else{
        req.session.user = null;
        return res.redirect('/notes');
    }
}

module.exports = {create, signin, signout, isAuthenticated}