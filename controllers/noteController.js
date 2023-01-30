const {Note: noteModel, Note} = require('../models/Note');
const db = require('../db/db');
const { set } = require('mongoose');

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
        console.log("Notas sincronizadas.");
    }).catch((error) => {
        console.log("Falha ao recuperar as notas: " + error );
    }
)};

async function editNote (req, res){
    try{
        await noteModel.updateOne({_id: req.body.id},{title: req.body.title, content: req.body.content});
        res.redirect('/');
    } catch(error){
        console.log(error);
    }
};

async function destroyNote (req, res){
        await noteModel.deleteOne({_id: req.body.id}).then(() => {
            console.log("Nota removida com sucesso");
            res.redirect('/');
    }).catch((error) => {
        console.log("Erro ao deletar nota." + error);
    }
)};

module.exports = {create, findAll, editNote, destroyNote};