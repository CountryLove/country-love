const router = require('express').Router();
const ensureAuth = require('../utils/ensure-auth');
const authAndAddUser = require('../utils/pull-user-id');
const Experience = require('../models/Experience');

router 
    .post ('/', authAndAddUser(), (req, res, next) => {
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
