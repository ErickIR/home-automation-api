const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../../config');

exports.validateJwt = (req, res, next) => {
  // console.log(req.headers);
  if (req.headers['authorization']) {
    // console.log(req.headers['authorization'])
    try {
      let authorization = req.headers['authorization'].split(' ');
      if (authorization[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Unauthorized user.' });
      } else {
        const payload = jwt.verify(authorization[1], jwtConfig.secret);
        req.user = {
          id: payload.id,
        };
        return next();
      }
    } catch (err) {
      return res.status(403).send();
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized user.' });
  }
};
