import pool from '../db/pool.js';
import { HttpError } from '../utils/httpError.js';

/**
 * Get the employer profile for the logged-in user
 * GET /api/employer/profile
 */
export const getEmployerProfile = async (req, res, next) => {
  try {
    const userId = req.user.sub; // From JWT payload set by requireAuth middleware

    const result = await pool.query(
      `SELECT 
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
        updated_at
      FROM employer_profiles
      WHERE user_id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      // Profile doesn't exist yet - return null or empty object
      // The frontend will handle creating the initial profile
      return res.json({ profile: null });
    }

    return res.json({ profile: result.rows[0] });
  } catch (err) {
    console.error('Get employer profile error:', err);
    next(new HttpError('Failed to fetch employer profile', 500));
  }
};

/**
 * Update or create the employer profile for the logged-in user
 * PUT /api/employer/profile
 */
export const updateEmployerProfile = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const {
      company_name,
      logo_url,
      website,
      industry,
      company_size,
      location,
      bio,
    } = req.body;

    // Validation
    if (company_name && company_name.length > 255) {
      return next(new HttpError('Company name must be 255 characters or less', 400));
    }

    if (website && website.length > 500) {
      return next(new HttpError('Website URL must be 500 characters or less', 400));
    }

    if (website && !website.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/i)) {
      return next(new HttpError('Invalid website URL format', 400));
    }

    if (industry && industry.length > 100) {
      return next(new HttpError('Industry must be 100 characters or less', 400));
    }

    const validCompanySizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
    if (company_size && !validCompanySizes.includes(company_size)) {
      return next(new HttpError('Invalid company size', 400));
    }

    if (location && location.length > 255) {
      return next(new HttpError('Location must be 255 characters or less', 400));
    }

    // Check if profile exists
    const existingProfile = await pool.query(
      'SELECT id FROM employer_profiles WHERE user_id = $1',
      [userId]
    );

    let result;

    if (existingProfile.rows.length === 0) {
      // Create new profile
      result = await pool.query(
        `INSERT INTO employer_profiles (
          user_id,
          company_name,
          logo_url,
          website,
          industry,
          company_size,
          location,
          bio
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING 
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
          updated_at`,
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
      // Update existing profile
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
        RETURNING 
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
          updated_at`,
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
    console.error('Update employer profile error:', err);

    // Handle database constraint violations
    if (err.code === '23514') {
      // Check constraint violation
      return next(new HttpError('Invalid data format', 400));
    }

    next(new HttpError('Failed to update employer profile', 500));
  }
};
