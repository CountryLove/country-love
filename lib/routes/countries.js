const Router = require('express').Router;
const router = Router();
const Country = require('../models/Country');
const ensureAuth = require('../utils/ensure-auth');

router

    .get('/', (req, res, next) => {
        Country.find()
            .select('name capital population')
            .lean()
            .then(result => res.json(result))
            .catch(next);
    })

    .get('/:id', ensureAuth(), (req, res, next) => {
        Country.findById(req.params.id)
            .lean()
            .then(result => res.json(result))
            .catch(next);
    });



module.exports = router;