const express = require('express');
const db = require('./data/db');

const server = express();

server.listen(5000, () => {
    console.log('===APP running on port 5000===')
})

//middleware
server.use(express.json);

//server routes
server.get('/', (req, res) => {
    response.send('<h1>GET REQUEST RECEIVED</h1>')
});

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json({users})
        })
        .catch(err => {
            res.status(500).json({error: 'PROBLEM WITH RETREIVING DATA'})
        })
})

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    db.findById(userId)
        .then(user => {
            res.json({user});
        })
        .catch(err => {
            res.status(500).json({ error: 'PROBLEM WITH RETREIVING DATA' })
        })
})

server.post('/api/users', (req, res) => {
    const user = request.body;
    db.insert(user)
        .then(userObj => {
            res.status(201).json(userObj)
        })
        .catch(err => res.status(500).json({err}))
})

//query string: http://google.com/search?sort=asc&search=trees
//req.body = {}
//req.query = {sort: 'asc', search: 'trees'}
server.delete('/api/users', (req, res) => {
    const { id } = req.query;
    let user;
    db.findById(id)
        .then(foundUser => {
            user = {...foundUser};
            return db.remove(id);
        })
        .then( __ => {
            res.status(204).json(user)
        })
        .catch(err => res.status(500).json({ err }))
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    db.update(id, updatedUser)
        .then(updated => {
            if (updated > 0) {
                db.findById(id)
                    .then(user => {
                        res.status(200).json(user)
                    })
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).json({ err }))
})