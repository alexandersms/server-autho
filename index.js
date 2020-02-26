const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./routes");
const http = require("http");
const expressServer = express();

expressServer.use(morgan("combined"))
expressServer.use(bodyParser.json({type: '*/'}));

const port = 3008
const server = http.createServer(expressServer);

server.listen(port)
console.log(`Le serveur ecoute sur le port ${port}`);
