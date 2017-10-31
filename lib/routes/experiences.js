const router = require('express').Router();
// const User = require('../models/User');
const ensureAuth = require('../utils/ensure-auth');
const Experience = require('../models/Experience');

router 
    .post ('/', ensureAuth(), (req, res, next) => {
        new Experience(req.body)
            .save()
            .then( result => res.json(result))
            .catch(next);
    });

module.exports = router;
