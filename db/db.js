const mongoose = require('mongoose');
const neo4j = require('neo4j-driver');
require('dotenv').config();

// Conexão com o banco de dados Neo4j
const NEO4J_URI = process.env.NEO4J_URI;
const NEO4J_USER = process.env.NEO4J_USER;
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD;
const uri = NEO4J_URI;
const user = NEO4J_USER;
const password = NEO4J_PASSWORD;
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const sessionAura = driver.session();
const connectNeo4j = async function(){
    try{ 
        driver;
        console.log("Conectou ao Neo4j!");
    } catch(err){
        console.log(err);
    }
}

// Conexão com o banco de dados MongoDB
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_CODE = process.env.DB_CODE;

const connectMongoDB = async function (){
    mongoose.set('strictQuery', true);
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.${DB_CODE}.mongodb.net/?retryWrites=true&w=majority`)
    .then(() =>{
        useMongoClient: true;
        console.log('conectou ao MongoDB!');
    }).catch((err) => console.log(err));
}

module.exports = {ConnectMongoDB: connectMongoDB, ConnectNeo4j: connectNeo4j, sessionAura};