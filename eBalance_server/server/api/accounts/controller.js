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
        const updatedAccount = await Account.update({
          where: id
        }, {
            title,
            balance,
        })

        res.status(200);

    } catch (error) {
        res.status(400).json({ error });
    }
};

export const deleteOne = async(req, res) => {
    const { id } = req.params;

    console.log('req param ID -> ', id);
    try {
        let account = await Account.destroy({ where: { id } });

        res.json({ deleted: true, account });
    } catch ({ errors }) {
        res.json({ deleted: errors })
    }
};

export const getAll = async(req, res) => {
    try {
        const accounts = await Account.findAll();

        res.status(200).json({ accounts });

    } catch ({ error }) {
        res.status(400).json({ error });
    }
};