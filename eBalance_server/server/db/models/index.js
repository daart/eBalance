import Sequelize from "sequelize";
import path from "path";
import keys from "../../config/keys";
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, './../../../.env')});

const { DB_USER, DB_PORT, DB_PASSWORD, DB_NAME } = process.env;
console.log('DB_USER > ', DB_USER, 'DB_PORT > ', DB_PORT, 'DB_PASSWORD > ', DB_PASSWORD, 'DB_NAME > ', DB_NAME);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: "localhost",
  port: DB_PORT,
  dialect: "postgres"
});

const db = {
  User: sequelize.import(path.join(__dirname, "/User"))
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
