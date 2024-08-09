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

export const deletePromosi = async (req, res) => {
  try {
    const promosi = await Promosi.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!promosi) return res.status(404).json({ msg: "Data tidak ditemukan" });

    if (req.role === "admin") {
      await Promosi.destroy({
        where: {
          id: promosi.id,
        },
      });
    } else {
      return res.status(403).json({ msg: "Akses terlarang" });
    }
    // kirim response
    res.status(200).json({ msg: "Promosi deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
