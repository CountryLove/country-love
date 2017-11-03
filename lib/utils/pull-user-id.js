const tokenService = require('./token-service');

module.exports = function () {
    console.log('+++++++++++++++++++++++++++++++++')
    return (req, res, next) => {
        const token = req.get('Authorization');
        tokenService.verify(token)
            .then(payload => {
                req.body.user = payload.id;
                console.log('===================================')
                console.log(payload);
                next();
            })
            .catch(() => {
                next({ code: 401, error: 'Not Authorized' });
            });
    };
};