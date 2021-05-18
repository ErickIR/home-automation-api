const jwt = require('jsonwebtoken');
const {
    jwtConfig
} = require('../../config');

exports.validateJwt = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).json({message: 'Unauthorized user.'});
            } else {
                req.jwt = jwt.verify(authorization[1], jwtConfig.secret);
                return next();
            }

        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).json({message: 'Unauthorized user.'});
    }
};