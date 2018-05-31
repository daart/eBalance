import db from "./server/db/models";
import app from './server';

const { DEV_PORT } = process.env;

(async () => {
  try {
    await db.sequelize
      .sync();
      // .sync({ force: true, logging: false })
    
    console.log("Connection has been established successfully.");

    app.listen(DEV_PORT, () => console.log(`our app is served on ${DEV_PORT}`));
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
})();