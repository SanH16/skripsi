import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Reward = db.define(
  "reward",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    bonus_reward: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    total_gaji: {
      type: DataTypes.INTEGER,
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

Users.hasMany(Reward, { foreignKey: "userId" });
Reward.belongsTo(Users, { foreignKey: "userId" });

export default Reward;
