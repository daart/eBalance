import db from './../../db/models';

import formatValidationErrors from './../../utils/formatValidationErrors';

const { Category } = db;

export const createOne = async (req, res) => {
  try {
    const userId = req.user_id;
    const { title, type, parentId } = req.body;
    const payload = { title, userId, type, parentId };
    const category = await Category.create(payload);

    res.status(200).json({ category });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      res.json({ errors: formatValidationErrors(error.errors) });
    } else {
      res.status(500).json({ msg: "Smth went wrong" });
    }
  }

};

export const updateOne = async (req, res) => {
  const { id } = req.params;

  try {
    let category = await Category.findById(id);
    let updatedCategory = await category.update(req.body);

    res.status(200).json({ category: updatedCategory });

  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteOne = async (req, res) => {
  const { id } = req.params;

  try {
    let category = await Category.findById(id);
    let updatedCategory = await category.update({ deleted: true });

    res.json({ deleted: true });
  } catch ({ errors }) {
    res.json({ deleted: errors })
  }
};

export const getAll = async (req, res) => {
  const userId = req.user_id;

  try {
    const categories = await Category.findAll({ where: { userId, deleted: false } });

    res.status(200).json({ categories });
  } catch ({ error }) {
    res.status(400).json({ error });
  }
};

export const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    res.status(200).json({ category });
  } catch ({ error }) {
    res.status(400).json({ error });
  }
};