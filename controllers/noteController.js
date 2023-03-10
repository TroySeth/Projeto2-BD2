const {Note: noteModel, Note} = require('../models/Note');
const db = require('../db/db');
let {driver, sessionAura} = require('../db/db');

// Making random marker
async function getMarker(){
    indicator = Math.floor(Math.random() * 10000000000);
    indicator = indicator.toString();
    const markerExists = await noteModel.findOne({marker: "indicator"});
    if(markerExists){
        getMarker();
    }
    return indicator;
}

// Função de criar notas
async function create (req, res){
    getMarker();
    try{
        new noteModel({
            title: req.body.title,
            content: req.body.content,
            date: noteModel.date,
            marker: indicator
        }).save()
        .then( async function(){
            const person = req.session.user;
            const createNote = await sessionAura.run(`CREATE (n: Note{marker: "${indicator}"})`)
            .then(sessionAura = driver.session())
            .then(await sessionAura.run(`MATCH (p: Person{username: "${person.username}"}) OPTIONAL MATCH (m: Note{marker: "${indicator}"}) CREATE (p)-[:CRIOU]->(m)`));
        })
        .then(async function(){
            res.status(201);
            findAll(req, res);
        })
    } catch(error){
        console.log("Erro ao criar nota:" + error);
    } 
};

// Função de sincronizar notas encontradas no banco
async function findAll (req, res){
    const username = req.session.user;
    if(username === undefined){
        res.redirect('/notes');
    } else{
        sessionAura = driver.session();
        const findNode = await sessionAura.run(`MATCH (p:Person) WHERE p.username = "${username.username}" OPTIONAL MATCH (p)-[:CRIOU]->(n:Note) RETURN n.marker`);
        const notes = findNode.records.map(record => record.get('n.marker'));
        await noteModel.find({marker: notes}).lean().then(Note=> {
            res.render('partials/notes/initial', {layout: 'notes', username: username.username, Note: Note});
        }).catch((error) => {
            console.log("Falha ao recuperar as notas: " + error );
        })
    }
};

// Função de pesquisar por palavras
async function findText (req, res){
    const username = req.session.user;
    sessionAura = driver.session();
    const findNode = await sessionAura.run(`MATCH (p:Person) WHERE p.username = "${username.username}" OPTIONAL MATCH (p)-[:CRIOU]->(n:Note) RETURN n.marker`);
    const notes = findNode.records.map(record => record.get('n.marker'));
    const filtrado = await noteModel.find({marker: { $in: notes }, $text: { $search: req.body.pesquisa}},{score: { $meta: "textScore" }}
    ).sort({score: { $meta : 'textScore' }}
    ).lean().then(Note=> {
        res.render('partials/notes/initial', {layout: 'notes', username: username.username, Note: Note});
    });
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
        await noteModel.deleteOne({marker: req.body.marker})
        .then(res.status(200).redirect('/notes'))
        .then(async function(){
            sessionAura = driver.session();
            const excludeNode = sessionAura.run(`MATCH (n:Note) WHERE n.marker = "${req.body.marker}" DETACH DELETE n`)
        });
    } catch(error){
        console.log("Erro ao deletar nota. " + error);
    }
};

module.exports = {create, findAll, editNote, destroyNote, findText};