import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import pool from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

const DUMMY_PASSWORD_HASH = '$2a$10$CwTycUXWue0Thq9StjUM0uJ8cKWvb.Y1j4Zt86M4fM6ZMxG5eP9Iq';

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function getJwtAccessSecret() {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw new Error('JWT_ACCESS_SECRET is not configured');
  }
  return secret;
}

function serializeUser(user) {
  return {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    app_metadata: {
      role: user.role || 'user',
    },
  };
}

function generateAccessToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role || 'user' },
    getJwtAccessSecret(),
    { expiresIn: '1h' }
  );
}

// REGISTER
router.post('/register', async (req, res) => {
  const fullName = req.body?.fullName?.trim();
  const email = normalizeEmail(req.body?.email);
  const password = req.body?.password;

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required' });
  if (!fullName || fullName.length < 2)
    return res.status(400).json({ error: 'Full name is required' });
  if (password.length < 8)
    return res.status(400).json({ error: 'Password must be at least 8 characters' });

  try {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0)
      return res.status(409).json({ error: 'Email already in use' });

    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password, full_name) VALUES ($1, $2, $3) RETURNING id, email, full_name, created_at',
      [email, hash, fullName]
    );
    const user = result.rows[0];

    return res.status(201).json({
      message: 'User registered successfully',
      user: serializeUser(user)
    });
  } catch (err) {
    console.error('Register error:', err);
    if (err.message === 'JWT_ACCESS_SECRET is not configured') {
      return res.status(500).json({ error: 'Authentication service is not configured' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = req.body?.password;

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required' });

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    const valid = user
      ? await bcrypt.compare(password, user.password)
      : await bcrypt.compare(password, DUMMY_PASSWORD_HASH);

    if (!user || !valid)
      return res.status(401).json({ error: 'Invalid email or password' });

    const accessToken = generateAccessToken(user);
    const refreshToken = uuidv4();

    await pool.query(
      "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL '7 days')",
      [user.id, refreshToken]
    );

    return res.json({
      token: accessToken,
      refresh_token: refreshToken,
      user: serializeUser(user)
    });
  } catch (err) {
    console.error('Login error:', err);
    if (err.message === 'JWT_ACCESS_SECRET is not configured') {
      return res.status(500).json({ error: 'Authentication service is not configured' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// REFRESH
router.post('/refresh', async (req, res) => {
  const token = req.body?.refresh_token;
  if (!token) return res.status(401).json({ error: 'No refresh token' });

  try {
    const result = await pool.query(
      'SELECT * FROM refresh_tokens WHERE token = $1 AND expires_at > NOW()',
      [token]
    );
    if (result.rows.length === 0)
      return res.status(401).json({ error: 'Refresh token invalid or expired' });

    const { user_id } = result.rows[0];
    const userResult = await pool.query('SELECT id, email, full_name FROM users WHERE id = $1', [user_id]);
    const user = userResult.rows[0];

    await pool.query('DELETE FROM refresh_tokens WHERE token = $1', [token]);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = uuidv4();

    await pool.query(
      "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL '7 days')",
      [user.id, newRefreshToken]
    );

    return res.json({
      token: newAccessToken,
      refresh_token: newRefreshToken,
      user: serializeUser(user)
    });
  } catch (err) {
    console.error('Refresh error:', err);
    if (err.message === 'JWT_ACCESS_SECRET is not configured') {
      return res.status(500).json({ error: 'Authentication service is not configured' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// LOGOUT
router.post('/logout', async (req, res) => {
  const token = req.body?.refresh_token;
  if (token) {
    await pool.query('DELETE FROM refresh_tokens WHERE token = $1', [token]).catch(() => {});
  }
  return res.json({ success: true });
});

// ME
router.get('/me', requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, full_name, created_at FROM users WHERE id = $1',
      [req.user.sub]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    return res.json({ user: serializeUser(result.rows[0]) });
  } catch {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
