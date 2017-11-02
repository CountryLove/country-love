const Router = require('express').Router;
const router = Router();
const Country = require('../models/Country');
// const ensureAuth = require('../utils/ensure-auth');


router

    .get('/literacy', (req, res, next) => {
        Country.aggregate([
            {
                $project: {
                    _id: false,
                    'name': 1,
                    'literacy': 1,
                    'literacyGap': {
                        $subtract: [
                            '$literacy.male',
                            '$literacy.female'
                        ]
                    }
                }
            },
            {
                $sort: { 'literacyGap': 1 }
            },
            {
                $match: {
                    'literacyGap': { $ne: null }
                }
            }
        ])
            .then(country => res.send(country))
            .catch(next);
    });

module.exports = router;