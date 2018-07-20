import Sequelize from "sequelize";
import path from "path";
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, './../../../.env')});

const { DB_USER, DB_PORT, DB_PASSWORD, DB_NAME } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: "localhost",
  port: DB_PORT,
  dialect: "postgres"
});

const db = {
  User: sequelize.import(path.join(__dirname, "/User")),
  Account: sequelize.import(path.join(__dirname, "/Account")),
  Category: sequelize.import(path.join(__dirname, "/Category")),
  Transaction: sequelize.import(path.join(__dirname, "/Transaction"))
};

Object.keys(db).forEach(modelName => {
  if('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
