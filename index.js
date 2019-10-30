const db = require("./data/db.js");
const express = require("express");

const server = express();

const port = 4321;

server.listen(port, () => {
    console.log(`**Server listening on port ${port}***`);
})

//middleware
server.use(express.json());

//GET request to "/"
server.get("/", (req, res) => {
    res.send("Hello from index.js inside Node-API1-Project");
})

//GET request to "api/users"
server.get("/api/users", (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json ({ message: "error: The users information could not be retrieved." });
        });
});

//POST request to "api/users"
server.post("/api/users", (req,res)=> {
    const userInfo = req.body;
    if(!userInfo.name || !userInfo.bio) {
        res.status(400).json({errorMessage:"Please provide name and bio for the user"})
    } else {
        db.insert(userInfo)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({error: "There was an error while saving the user to the database"})
        })
    }
})

//DELETE request to "api/users/:id"
server.delete("/api/users/:id", (req,res) => {
    const {id} = req.params
    db.remove(id)
    .then(deletedUser => {
        if(deletedUser) {
            res.status(204).end()
        } else {
            res.status(404).json({message:"The user with the specified Id does not exist"})
        }
    })
    .catch(err => {
        res.status(500).json({error:"The user could not be removed"})
    })
})

