import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Correctly retrieve the token
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, login' });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decodedToken.id; 
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: 'Error' });
  }
};

export default authMiddleware;
