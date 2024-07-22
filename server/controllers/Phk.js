import PHK from "../models/PhkModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getDataPHK = async (req, res) => {
  try {
    let response;
    if (req.role === "direktur") {
      response = await PHK.findAll({
        attributes: ["uuid", "nama_pegawai", "alasan_phk", "tanggal_keluar", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["email", "name", "role"],
          },
        ],
      });
    } else {
      response = await PHK.findAll({
        attributes: ["uuid", "nama_pegawai", "alasan_phk", "tanggal_keluar", "createdAt"],
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

export const getPhkById = async (req, res) => {
  try {
    const phk = await PHK.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!phk) return res.status(404).json({ msg: "Data tidak ditemukan" });

    let response;
    if (req.role === "direktur") {
      response = await PHK.findOne({
        attributes: ["uuid", "nama_pegawai", "alasan_phk", "tanggal_keluar", "createdAt"],
        where: {
          id: phk.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email", "role"],
          },
        ],
      });
    } else {
      response = await PHK.findOne({
        attributes: ["uuid", "nama_pegawai", "alasan_phk", "tanggal_keluar", "createdAt"],
        where: {
          [Op.and]: [{ id: phk.id }, { nama_pegawai: req.userName }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPhk = async (req, res) => {
  if (req.role !== "direktur") {
    return res.status(403).json({ msg: "Akses terlarang" });
  }
  const { nama_pegawai, alasan_phk, tanggal_keluar } = req.body;
  try {
    await PHK.create({
      nama_pegawai: nama_pegawai,
      alasan_phk: alasan_phk,
      tanggal_keluar: tanggal_keluar,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Phk Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePhk = async (req, res) => {
  try {
    const phk = await PHK.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!phk) return res.status(404).json({ msg: "Data tidak ditemukan" });

    if (req.role === "direktur") {
      await PHK.destroy({
        where: {
          id: phk.id,
        },
      });
    } else {
      return res.status(403).json({ msg: "Akses terlarang" });
    }
    // kirim response
    res.status(200).json({ msg: "PHK deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
