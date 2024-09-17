import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, login again' });
    }
    const decodedToken = jwt.verify(token, process.env.jwtSecret);
    req.userId = decodedToken.id; 
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: 'Not authorized, login again' });
  }
};

export default authMiddleware;
