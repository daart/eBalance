export default (sequelize, DataTypes) => {
  const categoryTypes = ['expense', 'income'];

  const Category = sequelize.define("category", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "is Required!"
        }
      }
    },

    categoryType: {
      type: DataTypes.ENUM,
      values: ["expense", "income"],
      defaultValue: 'expense'
    },

    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Category.associate = (models) => {
    Category.belongsTo(models.User)
  }

  return Category;
}