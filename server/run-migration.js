import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import pool from './src/db/pool.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigration() {
  try {
    console.log('Running database migration...');
    
    // Read the migration file
    const migrationSQL = readFileSync(
      join(__dirname, 'migrations', '001_add_full_name_to_users.sql'),
      'utf8'
    );
    
    // Execute the migration
    await pool.query(migrationSQL);
    
    console.log(' Migration completed successfully!');
    console.log('   - Added full_name column to users table');
    console.log('   - Updated existing users with default value');
    
    process.exit(0);
  } catch (error) {
    console.error(' Migration failed:', error.message);
    process.exit(1);
  }
}

runMigration();
