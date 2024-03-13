const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
module.exports.secret = secret;
// module.exports.authenticate = (req, res, next) => {
//   jwt.verify(req.cookies.userToken, secret, (err, payload) => {
//     if (err) { 
//       res.status(401).json({verified: false});
//     } else {
//       next();
//     }
//   });
// }

// jwt.config.js

module.exports = {
    authenticate: (req, res, next) => {
        // Implement your authentication logic here
        const token = req.cookies.userToken;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const decoded = jwt.verify(token, secret);
            req.user = decoded.user;
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
};
