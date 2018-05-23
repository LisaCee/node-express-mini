const logger = (req, res, next) => {
    console.log('LOGGER', req.body);
    next();
}

const errorHandling = (err, req, res, next) => {
    console.log(err);
    res.status(404).json({ error: error });
}

module.exports = {
    logger,
    errorHandling
}