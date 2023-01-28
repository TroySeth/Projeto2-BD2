const {Note: noteModel} = require('../models/Note');

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

module.exports = {create};