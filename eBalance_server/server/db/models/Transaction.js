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

  Transaction.prototype.execTransaction = async function (instance) {
    const { type, amount, fromId, toId } = this;

    if (type === 'expense') {
      await instance.decrement('balance', {by: amount, where: {id: fromId}})
    }
    if (type === 'income') {
      await instance.increment('balance', {by: amount, where: {id: toId}})
    }
    if (type === 'expense') {
      await instance.decrement('balance', {by: amount, where: {id: fromId}})
      await instance.increment('balance', {by: amount, where: {id: toId}})
    }

    instance.save();
  }

  return Transaction;
};


