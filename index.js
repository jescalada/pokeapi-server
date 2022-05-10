const express = require('express')
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');

const app = express()
const port = 3000

app.use(bodyparser.urlencoded({
    extended: true
}));

const pokemonSchema = new mongoose.Schema({
    name: String,
    types: [String],
    abilities: [String],
    id: Number,
    stats: [Object],
    sprite: String
}, { collection: 'pokemon' });

const pokemonModel = mongoose.model("pokemon", pokemonSchema);

mongoose.connect("mongodb+srv://juan:Rocco123@cluster0.nxfhi.mongodb.net/pokemon-db?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/pokemon/:pokemonId', (req, res) => {
    pokemonModel.find({ id: req.params.pokemonId }, function (err, pokemon) {
        if (err) {
            console.log("Error " + err);
        }
        res.json(pokemon);
    });
})

app.get('/name/:pokemonName', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})