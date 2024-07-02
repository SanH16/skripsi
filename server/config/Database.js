import { Sequelize } from "sequelize";

const db = new Sequelize("radenmat_simpeg", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
