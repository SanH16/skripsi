import Promosi from "../models/PromosiModel.js";
import User from "../models/UserModel.js";
// import { Op } from "sequelize";

export const getDataPromosi = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Promosi.findAll({
        attributes: ["uuid", "nama_pegawai", "jabatan_lama", "jabatan_baru", "tanggal_promosi", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["email", "name", "role"],
          },
        ],
      });
    } else {
      response = await Promosi.findAll({
        attributes: ["uuid", "nama_pegawai", "jabatan_lama", "jabatan_baru", "tanggal_promosi", "createdAt"],
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
