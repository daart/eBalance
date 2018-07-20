import db from "./../../db/models";

import formatValidationErrors from "./../../utils/formatValidationErrors";

const { Transaction, Account } = db;

export const createOne = async (req, res) => {
  const userId = req.user_id;
  const payload = Object.assign({}, {userId}, req.body);
  const { type, fromId, toId, amount } = req.body;
  
  try {
    const newTransaction = await Transaction.create(payload);
    
    newTransaction.execTransaction(Account)

    res.json({ transaction: newTransaction })
  } catch (error) {
    res.json({ error })
    console.log(error);
  }
}

export const getOne = async (req, res) => {

}

export const deleteOne = async (req, res) => {

}

export const updateOne = async (req, res) => {

}

export const getAll = async (req, res) => {
  const userId = req.user_id;

  try {
    const allTransactions = await Transaction.findAndCountAll({
      where: {
        userId,
      },
      limit: 3
    })

    const { limit, offset } = allTransactions;

    res.json({
      transactions: allTransactions,
      limit,
      offset
    })

  } catch (error) {
    res.json({ error })
    console.log(error)
  }
}
