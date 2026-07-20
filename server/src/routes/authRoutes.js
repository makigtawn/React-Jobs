import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import pool from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

function generateAccessToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: 'authenticated' },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '1h' }
  );
}

// REGISTER
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required' });
  if (password.length < 8)
    return res.status(400).json({ error: 'Password must be at least 8 characters' });

  try {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0)
      return res.status(409).json({ error: 'Email already in use' });

    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at',
      [email, hash]
    );
    const user = result.rows[0];

    const accessToken = generateAccessToken(user);
    const refreshToken = uuidv4();

    await pool.query(
      "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL '7 days')",
      [user.id, refreshToken]
    );

    return res.status(201).json({
      token: accessToken,
      refresh_token: refreshToken,
      user: { id: user.id, email: user.email }
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required' });

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    const dummyHash = '$2a$10$invalidhashfortimingattackprevention00000000000000000';
    const valid = user
      ? await bcrypt.compare(password, user.password)
      : await bcrypt.compare(password, dummyHash);

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
      user: { id: user.id, email: user.email }
    });
  } catch (err) {
    console.error('Login error:', err);
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
    const userResult = await pool.query('SELECT id, email FROM users WHERE id = $1', [user_id]);
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
      refresh_token: newRefreshToken
    });
  } catch (err) {
    console.error('Refresh error:', err);
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
      'SELECT id, email, created_at FROM users WHERE id = $1',
      [req.user.sub]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    return res.json({ user: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
