const Router = require('express').Router;
const router = Router();
const User = require('../models/User');
const ensureAuth = require('../utils/ensure-auth');

router

    .patch('/:id', ensureAuth(), (req, res, next) => {
        User.findOneAndUpdate(req.params.id, req.body , {new: true})
            .then(result => {
                res.json(result);
            })
            .catch(next);
    })

    .delete('/:id', ensureAuth(), (req, res, next) => {
        User.findByIdAndRemove((req.params.id), req.body)
            .then(result => {
                const exists = result != null;
                res.json({ removed: exists });
            })
            .catch(next);
    });

module.exports = router;