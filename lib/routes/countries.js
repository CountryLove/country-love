const Router = require('express').Router;
const router = Router();
const Country = require('../models/Country');

router

    .get('/', (req, res, next) => {
        Country.find()
            .select('name capital population')
            .then(result => res.json(result))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Country.findById(req.params.id)
            .then(result => res.json(result))
            .catch(next);
    });

module.exports = router;