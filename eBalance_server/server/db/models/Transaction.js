export default (sequelize, DataTypes) => {
  const transactionTypes = ['income', 'expense', 'transfer'];

  const Transaction = sequelize.define("transaction", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV
    },
    type: {
      type: DataTypes.ENUM,
      values: transactionTypes,
      defaultValue: transactionTypes[0]
    },
    from: {
      type: DataTypes.INTEGER
    },
    to: {
      type: DataTypes.INTEGER
    },
    category: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING
    }
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User)
  }

  return Transaction;
};