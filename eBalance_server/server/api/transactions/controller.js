import db from "./../../db/models";

import formatValidationErrors from "./../../utils/formatValidationErrors";

const { Transaction, Account, Category } = db;

export const createOne = async (req, res) => {
  const userId = req.user_id;
  const payload = Object.assign({}, {userId}, req.body);
  
  try {
    const t = await Transaction.create(payload);
    
    await t.execTransaction(Account)
    
    const transaction = await Transaction.findById(t.id, {
      include: [
        {
          model: Account, 
          as: 'fromAccount',
        },
        {
          model: Category, 
          as: 'category',
        },
        {
          model: Account, 
          as: 'toAccount',
        }
      ]
    });

    res.json({ transaction })
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
  const limit = 5;
  
  /* TODO: Pagination */
  let offset = req.query.page > 1 ? (req.query.page - 1) * limit : 0; 

  try {
    const allTransactions = await Transaction.findAndCountAll({
      where: {
        userId,
        deleted: false
      },
      include: [
        {
          model: Account, 
          as: 'fromAccount', 
          attributes: ['id', 'title', 'balance', 'deleted'], 
        },
        {
          model: Account, 
          as: 'toAccount', 
          attributes: ['id', 'title', 'balance', 'deleted'], 
        },
        {
          model: Category, 
          as: 'category', 
          attributes: ['id', 'title', 'deleted'], 
        },
      ],
      offset,
      limit,
    })

    const { rows, count } = allTransactions;

    res.json({
      transactions: rows,
      count,
      limit, 
      offset
    })

  } catch (error) {
    console.log('errrrrrr >> ', error);
    res.json({ error })
  }
}
