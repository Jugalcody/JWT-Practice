module.exports = function jwt(role) {
    return async (req, res, next) => {
        
      if (req.user.user.role !== role) {
        return res.status(403).json({ message: "Only Admin is Authorized!" });
      }
      next();
    }
  };
  