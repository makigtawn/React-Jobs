import pool from '../db/pool.js';
import { HttpError } from '../utils/httpError.js';

const validCompanySizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];

const validateProfileInput = ({ company_name, website, industry, company_size, location }) => {
  if (company_name && company_name.length > 255) {
    throw new HttpError(400, 'Company name must be 255 characters or less');
  }

  if (website && website.length > 500) {
    throw new HttpError(400, 'Website URL must be 500 characters or less');
  }

  if (website && !website.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/i)) {
    throw new HttpError(400, 'Invalid website URL format');
  }

  if (industry && industry.length > 100) {
    throw new HttpError(400, 'Industry must be 100 characters or less');
  }

  if (company_size && !validCompanySizes.includes(company_size)) {
    throw new HttpError(400, 'Invalid company size');
  }

  if (location && location.length > 255) {
    throw new HttpError(400, 'Location must be 255 characters or less');
  }
};

const PROFILE_COLUMNS = `
  id,
  user_id,
  company_name,
  logo_url,
  website,
  industry,
  company_size,
  location,
  bio,
  created_at,
  updated_at`;

// GET /api/company - Read Profile
export const getEmployerProfile = async (req, res, next) => {
  try {
    const userId = req.user.sub;

    const result = await pool.query(
      `SELECT ${PROFILE_COLUMNS} FROM employer_profiles WHERE user_id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.json({ profile: null });
    }

    return res.json({ profile: result.rows[0] });
  } catch (err) {
    console.error('Get employer profile error:', err);
    next(new HttpError(500, 'Failed to fetch employer profile'));
  }
};

// POST /api/company - Create Profile
export const createEmployerProfile = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { company_name, logo_url, website, industry, company_size, location, bio } = req.body;

    validateProfileInput({ company_name, website, industry, company_size, location });

    const existingProfile = await pool.query(
      'SELECT id FROM employer_profiles WHERE user_id = $1',
      [userId]
    );

    if (existingProfile.rows.length > 0) {
      return next(new HttpError(409, 'Profile already exists'));
    }

    const result = await pool.query(
      `INSERT INTO employer_profiles (
        user_id, company_name, logo_url, website, industry, company_size, location, bio
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING ${PROFILE_COLUMNS}`,
      [
        userId,
        company_name || null,
        logo_url || null,
        website || null,
        industry || null,
        company_size || null,
        location || null,
        bio || null,
      ]
    );

    return res.status(201).json({
      message: 'Profile created successfully',
      profile: result.rows[0],
    });
  } catch (err) {
    if (err instanceof HttpError) return next(err);
    console.error('Create employer profile error:', err);

    if (err.code === '23514') {
      return next(new HttpError(400, 'Invalid data format'));
    }

    next(new HttpError(500, 'Failed to create employer profile'));
  }
};

// PUT /api/company - Update Profile
export const updateEmployerProfile = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { company_name, logo_url, website, industry, company_size, location, bio } = req.body;

    validateProfileInput({ company_name, website, industry, company_size, location });

    const existingProfile = await pool.query(
      'SELECT id FROM employer_profiles WHERE user_id = $1',
      [userId]
    );

    let result;

    if (existingProfile.rows.length === 0) {
      result = await pool.query(
        `INSERT INTO employer_profiles (
          user_id, company_name, logo_url, website, industry, company_size, location, bio
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING ${PROFILE_COLUMNS}`,
        [
          userId,
          company_name || null,
          logo_url || null,
          website || null,
          industry || null,
          company_size || null,
          location || null,
          bio || null,
        ]
      );
    } else {
      result = await pool.query(
        `UPDATE employer_profiles SET
          company_name = COALESCE($2, company_name),
          logo_url = COALESCE($3, logo_url),
          website = COALESCE($4, website),
          industry = COALESCE($5, industry),
          company_size = COALESCE($6, company_size),
          location = COALESCE($7, location),
          bio = COALESCE($8, bio),
          updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $1
        RETURNING ${PROFILE_COLUMNS}`,
        [
          userId,
          company_name || null,
          logo_url || null,
          website || null,
          industry || null,
          company_size || null,
          location || null,
          bio || null,
        ]
      );
    }

    return res.json({
      message: 'Profile updated successfully',
      profile: result.rows[0],
    });
  } catch (err) {
    if (err instanceof HttpError) return next(err);
    console.error('Update employer profile error:', err);

    if (err.code === '23514') {
      return next(new HttpError(400, 'Invalid data format'));
    }

    next(new HttpError(500, 'Failed to update employer profile'));
  }
};

// DELETE /api/company - Delete Profile
export const deleteEmployerProfile = async (req, res, next) => {
  try {
    const userId = req.user.sub;

    const result = await pool.query(
      'DELETE FROM employer_profiles WHERE user_id = $1 RETURNING id',
      [userId]
    );

    if (result.rows.length === 0) {
      return next(new HttpError(404, 'Profile not found'));
    }

    return res.json({ message: 'Profile deleted successfully' });
  } catch (err) {
    console.error('Delete employer profile error:', err);
    next(new HttpError(500, 'Failed to delete employer profile'));
  }
};
