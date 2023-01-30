const {Note: noteModel, Note} = require('../models/Note');
const db = require('../db/db');

async function create (req, res){
    try{
        new noteModel({
            title: req.body.title,
            content: req.body.content,
            date: noteModel.date,
        }).save()
        res.status(201).redirect('/');
    } catch(error){
        console.log({error});
    }
};

async function findAll (req, res){
    await noteModel.find().lean().then((Note) => {
        res.render('partials/initial', {Note: Note});
        console.log("Notas recuperadas.");
    }).catch((error) => {
        console.log("Falha ao recuperar as notas: " + error );
    }
)};

module.exports = {create, findAll};