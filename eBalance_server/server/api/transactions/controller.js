import db from "./../../db/models";

import formatValidationErrors from "./../../utils/formatValidationErrors";

const { Transaction, Account } = db;

export const createOne = async (req, res) => {
  const userId = req.user_id;
  const payload = Object.assign({}, {userId}, req.body);
  
  try {
    const newTransaction = await Transaction.create(payload);
    
    await newTransaction.execTransaction(Account)

    res.json({ transaction: newTransaction })
  } catch (error) {
    console.log('TransCREATION Errora --> ', error);
    
    res.json({ error })
  }
}

export const updateOne = async (req, res) => {
  const { id } = req.params;
  
  try {
    let transaction = await Transaction.findById(id);
    await transaction.revertTransaction(Account);
    let updatedTransaction = await transaction.update(req.body);
    await updatedTransaction.execTransaction(Account);

    res.status(200).json({ transaction: updatedTransaction });

  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const deleteOne = async (req, res) => {
  const { id } = req.params;

  try {
    let transaction = await Transaction.findById(id);
    let deletedTransaction = await transaction.update({ deleted: true });

    res.json({ deleted: true, transaction: deletedTransaction });
  } catch ({ errors }) {
    res.json({ deleted: errors })
  }
};

export const getOne = async (req, res) => {

}

export const getAll = async (req, res) => {
  const userId = req.user_id;

  try {
    const allTransactions = await Transaction.findAndCountAll({
      where: {
        userId,
      },
      limit: 15
    })

    const { limit, offset } = allTransactions;

    res.json({
      transactions: allTransactions,
      limit,
      offset
    })

  } catch (error) {
    res.json({ error })
  }
}
