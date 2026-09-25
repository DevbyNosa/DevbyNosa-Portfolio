export function requireAdmin(req, res, next) {
  if (!req.session?.userId) {
    return res.status(401).json({
      statusCode: 401,
      success: false,
      message: "Not authenticated",
    });
  }
  next();
}