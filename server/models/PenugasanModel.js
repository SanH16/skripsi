import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Penugasan = db.define(
  "penugasan",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    keterangan_tugas: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    penempatan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // durasi_waktu: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    // },
    durasi_waktu: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notEmpty: true,
        isValidJSON(value) {
          try {
            const parsedValue = JSON.parse(JSON.stringify(value));
            if (!Array.isArray(parsedValue)) {
              throw new Error("durasi_waktu must be an array of objects with 'start' and 'end' properties");
            }
          } catch (error) {
            throw new Error("Invalid JSON format for durasi_waktu");
          }
        },
      },
    },
    status_tugas: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    divisi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tasks_list: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notEmpty: true,
        isValidJSON(value) {
          try {
            const parsedValue = JSON.parse(JSON.stringify(value));
            if (!Array.isArray(parsedValue)) {
              throw new Error("tasks_list must be an array of task objects");
            }
          } catch (error) {
            throw new Error("Invalid JSON format for tasks_list");
          }
        },
      },
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      references: {
        model: Users,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Penugasan, { foreignKey: "userId" });
Penugasan.belongsTo(Users, { foreignKey: "userId" });

export default Penugasan;
