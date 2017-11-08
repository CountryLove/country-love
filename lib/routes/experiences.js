const router = require('express').Router();
const ensureAuth = require('../utils/ensure-auth');
const Experience = require('../models/Experience');

router 
    .post ('/', ensureAuth(), (req, res, next) => {
        // you need to req.user.id to assign user/owner:
        req.body.user = req.user.id;
        new Experience(req.body)
            .save()
            .then( result => res.json(result))
            .catch(next);
    })

    .patch('/:id', ensureAuth(), (req, res, next) => {
        req.body.user = req.user.id;
        Experience.findOneAndUpdate(req.params.id, req.body , {new: true})
            .lean()
            .then(result => res.json(result))
            .catch(next);
    })

    .delete('/:id', ensureAuth(), (req, res, next) => {
        // add the user
        Experience.findOneAndRemove({ _id: req.params.id, user: req.user.id })
            .then(results => {
                const exists = results != null;
                res.json({ removed: exists });
            })
            .catch(next);
    });


module.exports = router;
