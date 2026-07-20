import jwt from 'jsonwebtoken';

function getJwtAccessSecret() {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw new Error('JWT_ACCESS_SECRET is not configured');
  }
  return secret;
}

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, getJwtAccessSecret());
    req.user = { ...payload, id: payload.sub };
    next();
  } catch (err) {
    if (err.message === 'JWT_ACCESS_SECRET is not configured') {
      return res.status(500).json({ error: 'Authentication service is not configured' });
    }
    return res.status(401).json({ error: 'Token invalid or expired' });
  }
}
