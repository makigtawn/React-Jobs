// import jwt from 'jsonwebtoken';

// export const authenticateToken = (req, res, next) => {
//   // Grab the token from cookies
//   const token = req.cookies.token; 

//   if (!token) {
//     return res.status(401).json({ message: "Access denied. Please log in." });
//   }

//   try {
//     // Verify using the secret from your environment variables
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; 
//     next();             
//   } catch (error) {
//     return res.status(403).json({ message: "Invalid or expired token." });
//   }
// };


import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = payload; 
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid or expired' });
  }
}
