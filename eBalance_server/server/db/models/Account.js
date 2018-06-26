export default (sequelize, DataTypes) => {
  const Account = sequelize.define("accounts", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "is Required!"
        }
      }
    },
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Account.associate = (models) => {
    Account.belongsTo(
      models.User
    )
  }

  return Account;
};
