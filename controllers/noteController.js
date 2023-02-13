const {Note: noteModel, Note} = require('../models/Note');
const db = require('../db/db');
let {driver, sessionAura} = require('../db/db');

// Making random marker
async function getMarker(){
    marker = Math.floor(Math.random() * 10000000000);
    const markerExists = await noteModel.findOne({marker: marker});
    if(markerExists){
        getMarker();
    }
    return marker;
}

// Função de criar notas
async function create (req, res){
    getMarker();
    try{
        new noteModel({
            title: req.body.title,
            content: req.body.content,
            date: noteModel.date,
            marker: marker
        }).save().then(res.status(201).redirect('/notes')).then( async function(){
            const note = await noteModel.find({marker: marker});
            const person = req.session.user;
            const createNote = await sessionAura.run(`CREATE (n :Note {marker: ${marker}})`)
            .then(sessionAura = driver.session())
            .then(await sessionAura.run(`MATCH (p: Person{username: "${person.username}"}) OPTIONAL MATCH (n: Note{marker: ${marker}}) CREATE (p)-[:CRIOU]->(n)`));
        })
    } catch(error){
        console.log("Erro ao criar nota:" + error);
    }
};

// Função de sincronizar notas encontradas no banco
async function findAll (req, res){
    await noteModel.find().lean().then((Note) => {
        const username = req.session.user.username;
        res.render('partials/notes/initial', {layout: 'notes', username: username, Note: Note});
        console.log("Notas sincronizadas.");
    }).catch((error) => {
        console.log("Falha ao recuperar as notas: " + error );
    }
)};

// Função de pesquisar por palavras
async function findText (req, res){
    console.log(req.body.pesquisa)

    const filtrado = await noteModel.find(
        { $text: { $search : req.body.pesquisa} },  
        { score : { $meta: "textScore" } 
        } 
    ).sort( 
        {  score: { $meta : 'textScore' } }
    ).lean().then((Note) => {
        res.render('partials/notes/initial', {Note: Note});
        console.log("Notas sincronizadas.");
    })
    
}

// Função de editar notas do banco
async function editNote (req, res){
    try{
        await (await noteModel.updateOne({_id: req.body.id},{title: req.body.title, content: req.body.content}))
        .then(res.status(201).redirect('/notes'));
    } catch(error){
        console.log("Falha ao editar nota: " + error);
    }
};

// Função de excluir notas do banco
async function destroyNote (req, res){
    try{
        await noteModel.deleteOne({_id: req.body.id})
        .then(res.status(200).redirect('/notes'));
    } catch(error){
        console.log("Erro ao deletar nota. " + error);
    }
};

module.exports = {create, findAll, editNote, destroyNote, findText};