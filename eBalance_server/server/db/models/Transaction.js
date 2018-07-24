export default (sequelize, DataTypes) => {
  const transactionTypes = ['income', 'expense', 'transfer'];

  const Transaction = sequelize.define("transactions", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.ENUM,
      values: transactionTypes,
      defaultValue: transactionTypes[0]
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    description: {
      type: DataTypes.STRING
    }
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User)
    Transaction.belongsTo(models.Category)
    Transaction.belongsTo(models.Account, { foreignKey: "fromId", as: "from" })
    Transaction.belongsTo(models.Account, { foreignKey: "toId", as: "to" });
  }

  Transaction.prototype.execTransaction = async function (accountModel) {
    const { type, amount, fromId, toId } = this;

    if (type === 'expense') {
      await accountModel.decrement('balance', {by: amount, where: {id: fromId}})
    }
    
    if (type === 'income') {
      await accountModel.increment('balance', {by: amount, where: {id: toId}})
    }
    
    if (type === 'transfer') {
      await accountModel.decrement('balance', {by: amount, where: {id: fromId}})
      await accountModel.increment('balance', {by: amount, where: {id: toId}})
    }

  }

  Transaction.prototype.revertTransaction = async function (accountModel) {
    const { type, amount, fromId, toId } = this;
    
    if (type === 'expense') {
      await accountModel.increment('balance', { by: amount, where: { id: fromId } });
    }

    if (type === 'income') {
      await accountModel.decrement('balance', { by: amount, where: { id: toId } });
    }
    
    if (type === 'transfer') {
      await accountModel.increment('balance', { by: amount, where: { id: fromId } });
      await accountModel.decrement('balance', { by: amount, where: { id: toId } });
    }

  }

  return Transaction;
};


