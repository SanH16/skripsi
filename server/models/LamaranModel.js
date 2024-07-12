import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Rekrutmens from "./RekrutmenModel.js";

const { DataTypes } = Sequelize;

const Lamaran = db.define(
  "lamaran",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    nomor_telepon: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    pendidikan_terakhir: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    keterampilan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dokumen_cv: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    dokumen_lain: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rekrutmenId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

Rekrutmens.hasMany(Lamaran);
Lamaran.belongsTo(Rekrutmens, { foreignKey: "rekrutmenId" });

export default Lamaran;
