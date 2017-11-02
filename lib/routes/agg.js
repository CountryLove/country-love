const Router = require('express').Router;
const router = Router();
const Country = require('../models/Country');
// const ensureAuth = require('../utils/ensure-auth');


router

    .get('/literacy', (req, res, next) => {
        Country.literacyGap()
            .then(country => res.send(country))
            .catch(next);
    });

module.exports = router;