import express from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../../config/database.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export default async function AdminLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(
        new ApiResponse(400, false, "All fields are required")
      );
    }

    
    const dbResponse = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

    
    if (dbResponse.rows.length === 0) {
      return res.status(401).json(
        new ApiResponse(401, false, "Incorrect credentials. Try again")
      );
    }

    const user = dbResponse.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json(
        new ApiResponse(401, false, "Incorrect credentials. Try again")
      );
    }

    
    const { password: _, ...userData } = user;
    return res.status(200).json(
      new ApiResponse(200, true, "Login successful", { user: userData })
    );

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json(
      new ApiResponse(500, false, "Internal server error")
    );
  }
}
