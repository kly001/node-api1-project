const db = require("./data/db.js");
const express = require("express");

const server = express();

const port = 4321;

server.listen(port, () => {
    console.log(`**Server listening on port ${port}***`);
})
