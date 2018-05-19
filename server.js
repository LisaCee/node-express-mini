const express = require('express');
const db = require('./data/db');
const helmet = require('helmet');

const server = express();

server.listen(5000, () => {
    console.log('**APP RUNNING ON PORT 5000**');
});

//middleware
server.use(express.json);
server.use(helmet());

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json({ users });
        })
        .catch(err => {
            res.status(500).json({ error: "The users information could not be retrieved." });
        })
})

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    db.findById(userId)
        .then(user => {
            if (user === undefined) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else {
                res.status(200).json({ user })
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'The user information could not be retrieved' })
        })
})

server.post('/api/users', (req, res) => {
    const newUser = req.body;
    if (newUser.name === undefined || newUser.bio === undefined) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        return;
    } else {
        db.insert(newUser)
            .then(user => {
                res.status(201).json({ newUser });
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the user to the database" });
            })
    }
})

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const deletedUser = db.findById(userId);

    if (deletedUser === undefined) {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    } else {
        db.remove(userId)
            .then(user => {
                res.status(200).json({ deletedUser });
            })
            .catch(err => {
                res.status(500).json({ error: "The user could not be removed" });
            })
    }
})

server.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const updateUser = db.findById(userId);
    const userUpdate = req.params.body;

    if (updateUser.name === undefined || updateUser.bio === undefined) {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    } else if (userUpdate.name === undefined || userUpdate.bio === undefined) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        db.update(userId, userUpdate)
            .then(userUpdate => {
                res.status(200).json({ userUpdate })
            })
            .catch(err => {
                res.status(500).json({ error: "The user information could not be modified." })
            })
    }

})
