const db = require("./data/db.js");
const express = require("express");

const server = express();

const PORT = process.env.PORT ||4321;

server.listen(PORT, () => {
    console.log(`**Server listening on port ${PORT}***`);
})

//middleware
server.use(express.json());

//GET request to "/"
server.get("/", (req, res) => {
    res.send("Hello from index.js inside Node-API1-Project");
})

//Return an array of all users: GET request to "api/users"
server.get("/api/users", (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json ({ message: "error: The users information could not be retrieved." });
        });
});


//Create a user: POST request to "api/users"
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

//Remove user with specified Id: DELETE request to "api/users/:id"
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

//Update a users with specified Id; returns new information:  PUT request to "api/users/id"
server.put("/api/users/:id", (req,res) => {
    const {id} = req.params;
    const userInfo = req.body;
   
    if(!userInfo.name || !userInfo.bio) {
        res.status(400).json({errorMessage:"Please provide name and bio for the user"})
    } else {
        db.update(id, userInfo)
        .then(user => {
            if(user) {
                res.status(200).json({message:`User with Id# ${id} has been updated`})
            } else {
                res.status(404).json({message:"The user with the specified Id does not exist"})
            }
        })
        .catch(err => {
            res.status(500).json({error:"The user information could not be modified"})
        })
    }
})

//Return a specific user: GET request to "api/users/:id"
server.get("/api/users/:id", (req, res) => {
    
});