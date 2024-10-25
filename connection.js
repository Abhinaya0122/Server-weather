const {MongoClient} = require('mongodb');

const client = new MongoClient("mongodb+srv://dhineshkumaran2004:zi2ue7crKgwUm2nf@cluster0.ouabet2.mongodb.net/");

async function Main() {
    try {
        await client.connect();
        console.log("Connected to database.");
    } catch (error) {
        console.log("Error connecting to database.");
    }
}

Main();

module.exports = client;