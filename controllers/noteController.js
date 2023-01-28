const {Note: noteModel} = require('../models/Note');

async function create (req, res){
    try{
        new noteModel({
            title: req.body.title,
            content: req.body.content,
        }).save()
        const response = await noteModel.create;
        res.status(201).json({response, msg: "Nota criada com sucesso."}).redirect('/source/html/index.html');
    } catch(err){
        console.log("Erro ao criar nota.");
    }
};

module.exports = {create};