export default (sequelize, DataTypes) => {
  const Category = sequelize.define("categories", {
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
    
    type: {
      type: DataTypes.ENUM,
      values: ["expense", "income"],
      defaultValue: "expense"
    },

    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Category.associate = models => {
    Category.belongsTo(models.Category, { foreignKey: "parentId" });
    Category.belongsTo(models.User);
  };

  return Category;
}