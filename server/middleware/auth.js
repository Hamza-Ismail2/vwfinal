const jwt = require('jsonwebtoken');

module.exports = function (requiredRole) {
  return function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
      req.user = decoded;
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ success: false, error: 'Forbidden' });
      }
      next();
    } catch (err) {
      return res.status(401).json({ success: false, error: 'Token invalid' });
    }
  };
}; 