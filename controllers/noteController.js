const {Note: noteSchema} = require('../models/Anotations');

const noteController = {
    create: async(req, res) =>{
        try{
            const note = {
                title: req.body.title,
                content: req.body.content
            };
            const response = await noteSchema.create(note);
            res.status(201).json({response, msg: "Nota criada com sucesso."});
        
        } catch(error){
            console.log(error);
        }
    }
};

module.exports = {noteController};