import bcrypt from "bcrypt";

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "is Required!"
          },
          isEmail: true,
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "is Required!"
          },
          len: [4, 20]
        }
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "is Required!"
          },
          len: [4, 20]
        }
      }
    },
    {
      hooks: {
        beforeCreate: async (user, options) => {
          const saltRounds = 10;
          let hashedPass = await bcrypt.hash(user.password, saltRounds);
          user.password = hashedPass;

          return user;
        }
      }
    }
  );

  // User.associate = (models) => {
  //   User.hasMany(
  //     models.Account, {
  //       foreignKey: {
  //         name: 'userId',
  //         field: 'user_id',
  //       }
  //     }
  //   );
    
  //   User.hasMany(
  //     models.Category, {
  //       foreignKey: {
  //         name: 'userId',
  //         field: 'user_id',
  //       }
  //     }
  //   );
  // }
  
  return User;
};
