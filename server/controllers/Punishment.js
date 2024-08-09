import Punishment from "../models/PunishmentModel.js";
import User from "../models/UserModel.js";
import Pegawai from "../models/PegawaiModel.js";
import { Op } from "sequelize";

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

export const getPunishmentById = async (req, res) => {
  try {
    const punishment = await Punishment.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!punishment) return res.status(404).json({ msg: "Data tidak ditemukan" });

    let response;
    if (req.role === "admin") {
      response = await Punishment.findOne({
        attributes: ["uuid", "nama_pegawai", "keterangan_sanksi", "createdAt"],
        where: {
          id: punishment.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email", "role"],
            include: [
              {
                model: Pegawai,
                attributes: ["jabatan"],
              },
            ],
          },
        ],
      });
    } else {
      response = await Punishment.findOne({
        attributes: ["uuid", "nama_pegawai", "keterangan_sanksi", "createdAt"],
        where: {
          [Op.and]: [{ id: punishment.id }, { nama_pegawai: req.userName }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
            include: [
              {
                model: Pegawai,
                attributes: ["jabatan"],
              },
            ],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPunishment = async (req, res) => {
  const { nama_pegawai, keterangan_sanksi } = req.body;
  try {
    await Punishment.create({
      keterangan_sanksi: keterangan_sanksi,
      nama_pegawai: nama_pegawai,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Punishment Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePunishment = async (req, res) => {
  try {
    const punishment = await Punishment.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!punishment) return res.status(404).json({ msg: "Data tidak ditemukan" });

    if (req.role === "admin") {
      await Punishment.destroy({
        where: {
          id: punishment.id,
        },
      });
    } else {
      return res.status(403).json({ msg: "Akses terlarang" });
    }
    // kirim response
    res.status(200).json({ msg: "Punishment deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
