import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const protectedRoute = async (req, res, next) => {
  const token = req.body.token || req.headers.authorization;

  if (token) {
    const decoded = await jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if(err) {
        return res.status(401).json({ error: "unauthorized" });
      } else {

        req.user_id = decoded.id
        next()
      }
    });
  } else {
    res.status(401).json({ error: "unauthorized" });
  }

};

export default protectedRoute;