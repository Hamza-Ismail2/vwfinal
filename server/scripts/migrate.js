const { initDatabase } = require('../config/database');

async function runMigrations() {
  try {
    console.log('🚀 Starting database migration...');
    await initDatabase();
    console.log('✅ Database migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database migration failed:', error);
    process.exit(1);
  }
}

runMigrations(); 