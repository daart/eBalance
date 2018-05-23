import jwt from "jsonwebtoken";

import db from "./../../db/models";

const { User } = db;
const { JWT_SECRET } = process.env;

const protect = async (req, res, next) => {
  const token = req.body.token || req.headers.authorization;

  if (token) {
    const decoded = await jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if(err) {
        return res.status(401).json({ error: "unauthorized" });
      } else {
        next()
      }
    });
  } else {
    res.status(401).json({ error: "unauthorized" });
  }

};

export default protect;
