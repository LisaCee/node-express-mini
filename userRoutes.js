const express = require('express');
const db = require('./data/db');
const router = express.Router();

router.get('/', (req, res, next) => {
    db.find()
        .then(users => {
            res.status(200).json({ users });
        })
        .catch(err => {
            res.status(500).json({ error: "The users information could not be retrieved." });
        })
})

router.get('/:id', (req, res, next) => {
    const userId = req.params.id;

    db.findById(userId)
        .then(user => {
            if (user.length === 0) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else {
                res.status(200).json({ user })
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'The user information could not be retrieved' })
        })
})

router.post('/', (req, res, next) => {
    const newUser = req.body;
    if (newUser.name === undefined || newUser.bio === undefined || newUser.name.length === 0 || newUser.bio.length === 0) {
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

router.delete('/:id', (req, res, next) => {
    const userId = req.params.id;
    let deletedUser;

    db.findById(userId)
        .then(user => {
            if (user.length === 0) {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
            else {
                deletedUser = user[0];
                db.remove(userId)
                    .then(user => {
                        res.status(200).json({ deletedUser });
                    })
                    .catch(err => {
                        res.status(500).json({ error: "The user could not be removed" });
                    })
            }
        })
})

router.put('/:id', (req, res, next) => {
    const userId = req.params.id;
    const updatedUser = req.body;

    if (updatedUser.name === undefined || updatedUser.bio === undefined || updatedUser.name.length === 0 || updatedUser.bio.length === 0) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
    db.update(userId, updatedUser)
        .then(num => {
            if (num === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                db.findById(userId)
                    .then(user => res.status(200).json(user))
                    .catch(err => res.status(500).json({ error: "The post information could not be modified." }))
            }
        })
        .catch(err => res.status(500).json({ error: "The post information could not be modified." }))
})

module.exports = router;