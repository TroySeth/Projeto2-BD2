const {Note: noteModel, Note} = require('../models/Note');
const db = require('../db/db');

async function create (req, res){
    try{
        new noteModel({
            title: req.body.title,
            content: req.body.content,
            date: noteModel.date,
        }).save();
        setTimeout(function() {
            res.status(201).redirect('/');
        }, 2000);
    } catch(error){
        console.log("Erro ao criar nota:" + error);
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
        setTimeout(function() {
            res.status(201).redirect('/');
        }, 1000);
    } catch(error){
        console.log("Falha ao editar nota: " + error);
    }
};

async function destroyNote (req, res){
        await noteModel.deleteOne({_id: req.body.id}).then(() => {
            setTimeout(function() {
                res.status(200).redirect('/');
            }, 500);
    }).catch((error) => {
        console.log("Erro ao deletar nota." + error);
    }
)};

module.exports = {create, findAll, editNote, destroyNote};