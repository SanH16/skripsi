import Punishment from "../models/PunishmentModel.js";
import User from "../models/UserModel.js";
// import { Op } from "sequelize";

export const getDataPunishment = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Punishment.findAll({
        attributes: ["uuid", "nama_pegawai", "keterangan_sanksi", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["email", "name", "role"],
          },
        ],
      });
    } else {
      response = await Punishment.findAll({
        attributes: ["uuid", "nama_pegawai", "keterangan_sanksi", "createdAt"],
        where: {
          nama_pegawai: req.userName,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email", "role"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
