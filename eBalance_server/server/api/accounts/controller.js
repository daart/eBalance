import db from './../../db/models';

import formatValidationErrors from './../../utils/formatValidationErrors';

const { Account } = db;

export const createOne = async(req, res) => {
    try {
        const userId = req.user_id;
        const { title, balance } = req.body;
        const payload = { title, balance, userId };

        const account = await Account.create(payload);

        res.status(200).json({ account });
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

};

export const updateOne = async(req, res) => {
    const { title, balance } = req.body;
    const { id } = req.params;

    try {
        let account = await Account.findById(id);
        let updatedAccount = await account.update({
            title,
            balance,
        });

        res.status(200).json({ account: updatedAccount });

    } catch (error) {
        res.status(400).json({ error });
    }
};

export const deleteOne = async(req, res) => {
    const { id } = req.params;

    try {
        let account = await Account.findById(id);
        let updatedAccount = await account.update({ deleted: true });

        res.json({ deleted: true });
    } catch ({ errors }) {
        res.json({ deleted: errors })
    }
};

export const getAll = async(req, res) => {
    const userId = req.user_id;

    try {
        const accounts = await Account.findAll({ where: { userId, deleted: false }});
        
        res.status(200).json({ accounts });
    } catch ({ error }) {
        res.status(400).json({ error });
    }
};

export const getOne = async(req, res) => {
  const { id } = req.params;

    try {
      const account = await Account.findById(id);

      res.status(200).json({ account });
    } catch ({ error }) {
      res.status(400).json({ error });
    }
};