const Router = require('express').Router;
const router = Router();
const User = require('../models/User');
const ensureAuth = require('../utils/ensure-auth');

router

    .patch('/', ensureAuth(), (req, res, next) => {
        User.findOneAndUpdate(req.user.id, req.body , {new: true})
            .then(result => res.json(result))
            .catch(next);
    })
    // are you sure this should be a route???
    .delete('/', ensureAuth(), (req, res, next) => {
        User.findByIdAndRemove((req.user.id), req.body)
            .then(result => {
                const exists = result != null;
                res.json({ removed: exists });
            })
            .catch(next);
    });

module.exports = router;