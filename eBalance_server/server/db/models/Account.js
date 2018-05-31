export default (sequelize, DataTypes) => {
  const Account = sequelize.define("account", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 20]
      }
    },
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  Account.associate = (models) => {
    Account.belongsTo(
      models.User
    )
  }

  return Account;
};
