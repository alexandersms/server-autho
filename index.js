const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./routes");
const http = require("http");
const expressServer = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://alex:170608@cluster0-cwezd.mongodb.net/test?retryWrites=true&w=majority", 
{ 
    useUnifiedTopology: true,
    useNewUrlParser: true 
})
mongoose.connection
    .once("open", ()=> console.log("Connecté à Mlab"))
    .on("error", error => console.log(`Erreur de connexion à Mlab ${error}`))

expressServer.use(morgan("combined"))
expressServer.use(bodyParser.json({type: '*/'}));

const port = 3008
const server = http.createServer(expressServer);
router(expressServer);

server.listen(port)
console.log(`Le serveur ecoute sur le port ${port}`);
