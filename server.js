const express = require('express');
// const db = require('./data/db');
const helmet = require('helmet');
// const cors = require('cors');
const userRoutes = require('./userRoutes');
const server = express();

//middleware
server.use(express.json());
// server.use(cors());
server.use(helmet());

server.listen(5000, () => {
    console.log('**APP RUNNING ON PORT 5000**');
});

server.use('/api/users', userRoutes)
