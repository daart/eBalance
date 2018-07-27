import db from './../../db/models';

const { User } = db;

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    let user = await User.destroy({where: { id }});

    res.json({ deleted: true, user });
  } catch ({errors}) {
    res.json({deleted: errors})
  }
}

export const getAllUsers = async (req, res) => {
  try {
    let users = await User.findAll();
    
    res.json({ users });
  } catch ({ error }) {
    res.send(400).json({ error });
  }
};
