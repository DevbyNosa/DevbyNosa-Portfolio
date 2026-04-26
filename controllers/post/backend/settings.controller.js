import pool from "../../../database/config/config.js";
import bcrypt from 'bcrypt';

const ADMIN_LINK = process.env.ADMIN_PREFIX
export async function updateAdminSettings(req, res, next) {
  try {
    const { new_username, old_password, new_password, re_password } = req.body;

    
    const adminResult = await pool.query("SELECT * FROM admindetails LIMIT 1");
    const admin = adminResult.rows[0];

    if (!admin) {
      return res.redirect(`/${ADMIN_LINK}/settings?status=NoAdminFound`);
    }

    
    const isMatch = await bcrypt.compare(old_password, admin.password);

    if (!isMatch) {
      const message = encodeURIComponent("Incorrect password");
      return res.redirect(`/${ADMIN_LINK}/settings?status=${message}`);
    }

    
    await pool.query("UPDATE admindetails SET username = $1", [new_username]);

    
    if (new_password && new_password === re_password) {
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(new_password, salt);
      await pool.query("UPDATE admindetails SET password = $1", [hashedNewPassword]);
    }

    return res.redirect(`/${ADMIN_LINK}/settings?status=Success`);

  } catch (error) {
    console.error("Error Changing admin Details:", error);
    next(error);
  }
}
