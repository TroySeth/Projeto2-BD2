require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Note = require('./models/Note')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('<h1>INotas</h1>')
})


app.post('/addnote', async (req, res) => {

    const {title, content} = req.body

    const note = {
        title,
        content,
    }

    try {
        await Note.create(note)

        res.status(201).json({message: 'Note inserted'})
        //route of creation


    } catch (error){
        res.status(500).json({error: error})
    }
})


app.patch('/:id', async (req, res) => {

})
app.delete('/:id', async (req, res) => {

})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
mongoose.set('strictQuery', true)
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.fcutvj8.mongodb.net/?retryWrites=true&w=majority`)
    .then(() =>{
        console.log('conectou ao MongoDB!')
        app.listen(3000)
        
    })
    .catch((err) => console.log(err))


    const bttnAdd = document.getElementById('add');

    //fazer um const que percorra o banco para procurar todas as notas e ja imprimir na tela

    mongodb+srv://dxniel:<password>@cluster0.grivyap.mongodb.net/?retryWrites=true&w=majority