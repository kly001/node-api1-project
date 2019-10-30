const db = require("./data/db.js");
const express = require("express");

const server = express();

const port = 4321;

server.listen(port, () => {
    console.log(`**Server listening on port ${port}***`);
})

server.use(express.json());

server.get("/", (req, res) => {
    res.send("Hello from index.js inside Node-API1-Project");
})

server.get('/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
});