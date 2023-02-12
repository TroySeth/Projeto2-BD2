const {user: userModel, user} = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function create (req, res){
    const {name, username, email, password} = req.body

    const haveEmail = await userModel.findOne({email: email})
    const haveUser = await userModel.findOne({username: username})

    if(haveEmail){
        return res.status(422).json('email já cadastrado, tente com outro email!')
    }
    if(haveUser){
        return res.status(422).json('usuário já existe, tente com outro usuário!')
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    try{
        new userModel({
            name,
            username,
            email,
            password: passwordHash
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
    const checkPassword = await bcrypt.compare(password, user.password)
    if(!checkPassword){
        return res.status(422).json('Senha inválida!')
    }
    
    try{
        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user.id,
            expiresIn: 3600
        },
        secret
    )
        const tokenBearrer = `Bearer ${token}`

        //req.session.user = user

        res.cookie('token_acesso', tokenBearrer, { maxAge: 3600000})
        res.redirect('/')
    } catch(error){
        res.status(422).json('autenticação não funcionou')
    }
}

async function isAuthenticated (req, res, next){
    const { token_acesso } = req.cookies
    if(token_acesso){
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

module.exports = {create, signin, isAuthenticated}