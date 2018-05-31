import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import formatValidationErrors from './../../utils/formatValidationErrors';

import db from './../../db/models';

const { User } = db;
const { JWT_SECRET } = process.env;

export const login = async (req, res) => {
  const { email, password } = req.body;
  let userFound = await User.findOne({
    where: {
      email
    }
  });

  if (!userFound) {
    return res.json({
      errors: {
        password: ["user or password is invalid"]
      }
    });
  } else {
    let verifiedByEmailUser = await bcrypt.compare(
      password,
      userFound.password
    );

    if (!verifiedByEmailUser) {
      return res.json({
        errors: {
          password: ["user or password is invalid"]
        }
      });
    }

    let { email, login, id } = userFound;
    let payload = { login, email, id };

    jwt.sign(payload, JWT_SECRET, { expiresIn: 120 }, (err, token) => {
      return res.json({
        token
      });
    });
  }
};

export const register = async (req, res) => {
  try {
    let newUser = await User.create(req.body);

    res.status(200).json({ user: newUser });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      res.json({ errors: formatValidationErrors(error.errors) });
    } else {
      console.log(error);
      res.status(500).json({ msg: "Smth went wrong" });
    }
  }
}

export const validateToken = async (req, res) => {
  let token = req.body.token;

  if (!token) {
    return res.json({ valid: false });
  }

  try {
    let decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true });
  } catch (err) {
    res.json({ valid: false });
  }
}
