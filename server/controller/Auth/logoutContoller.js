export default function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error("[logout] failed:", err);
      return res.status(500).json(
        new ApiResponse(500, false, "Logout failed")
      );
    }
    res.clearCookie("connect.sid");
    return res.status(204).end();
  });
}