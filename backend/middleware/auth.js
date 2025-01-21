import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, please login' });
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decodedToken.id };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({
      success: false,
      message: error.name === 'TokenExpiredError' ? 'Token expired, please login again' : 'Authentication failed, invalid token',
    });
  }
};

export default authMiddleware;  