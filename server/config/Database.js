import { Sequelize } from "sequelize";

const db = new Sequelize("radenmat_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
