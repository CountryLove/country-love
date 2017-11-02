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
    })

    .patch('/:id', ensureAuth(), (req, res, next) => {
        Experience.findOneAndUpdate(req.params.id, req.body , {new: true})
            .lean()
            .then(result => res.json(result))
            .catch(next);
    })

    .delete('/:id', ensureAuth(), (req, res, next) => {
        Experience.findByIdAndRemove((req.params.id), req.body)
            .then(results => {
                const exists = results != null;
                res.json({ removed: exists });
            })
            .catch(next);
    });


module.exports = router;
