/*import bcrypt from 'bcrypt';
import { pool } from '../config/database.js';

export async function seedAdmin() {

  const adminEmail = 'admin@example.com';
  const plainPassword = 'SuperSecureAdminPassword123!'; 
  const adminRole = 'admin'; 

  try {
    console.log('🔄 Checking if admin already exists...');
    
    
    const existingUser = await pool.query(
      'SELECT 1 FROM users WHERE email = $1', 
      [adminEmail]
    );

    if (existingUser.rows.length > 0) {
      console.log('⚠️ Admin account already exists. Seeding skipped.');
      return;
    }

    console.log('🔑 Hashing password...');
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    console.log('🚀 Creating admin account...');
    
    const insertQuery = `
      INSERT INTO users (email, password, role) 
      VALUES ($1, $2, $3) 
      RETURNING id, email, role
    `;
    
    const result = await pool.query(insertQuery, [adminEmail, hashedPassword, adminRole]);
    
    console.log('✅ Admin account successfully created!');
    console.log('Admin Details:', result.rows[0]);

  } catch (error) {
    console.error('❌ Error seeding admin account:', error);
  } finally {
   
    await pool.end();
    console.log('🔌 Database connection closed.');
  }
}


seedAdmin();*/
