const Router = require('express').Router;
const router = Router();
const Country = require('../models/Country');
// const ensureAuth = require('../utils/ensure-auth');
const Experience = require('../models/Experience');


router

    .get('/literacy', (req, res, next) => {
        Country.literacyGap()
            .then(country => res.send(country))
            .catch(next);
    })
    
    .get('/internetUsers', (req, res, next) => {
        Country.internetUsers()
            .then( data => res.send(data))
            .catch(next);
    })

    .get('/childLabor', (req, res, next) => {
        Country.childLabor()
            .then( data => res.send(data))
            .catch(next);
    })
    
    .get('/avgRating', (req, res, next) => {
        Experience.avgRating()
            .then( data => res.send(data))
            .catch(next);
    })

    .get('/countriesByLang', (req, res, next) => {
        Experience.countriesByLang(req.query.language)
            .then( data => {
                res.send(data);
            })
            .catch(next);
    })

    .get('/userCountryLog', (req, res, next) => {
        Experience.userCountryLog(req.query.username)
            .then( data => {
                res.send(data);
            })
            .catch(next);
    });



module.exports = router;