const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.sendStatus(401);
  }
  try {
    const data = jwt.verify(authHeader, 'hgjkhgkjtygjhktg86r565GFHGHFTWFERgjhghgRiyadAmeri');
    req.user = data; 
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
};
