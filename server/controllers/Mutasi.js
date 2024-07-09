import Mutasi from "../models/MutasiModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getDataMutasi = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Mutasi.findAll({
        attributes: ["uuid", "keterangan_mutasi", "cabang_sebelum", "cabang_tujuan", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["name", "email", "role"],
          },
        ],
      });
    } else {
      response = await Mutasi.findAll({
        attributes: ["uuid", "keterangan_mutasi", "cabang_sebelum", "cabang_tujuan", "createdAt"],
        where: {
          userId: req.userId,
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

export const getMutasiById = async (req, res) => {
  try {
    const mutasi = await Mutasi.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!mutasi) return res.status(404).json({ msg: "Data tidak ditemukan" });

    let response;
    if (req.role === "admin") {
      response = await Mutasi.findOne({
        attributes: ["uuid", "keterangan_mutasi", "cabang_sebelum", "cabang_tujuan", "createdAt"],
        where: {
          id: mutasi.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email", "role"],
          },
        ],
      });
    } else {
      response = await Mutasi.findOne({
        attributes: ["uuid", "keterangan_mutasi", "cabang_sebelum", "cabang_tujuan", "createdAt"],
        where: {
          [Op.and]: [{ id: mutasi.id }, { userId: req.userId }],
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

export const createMutasi = async (req, res) => {
  const { keterangan_mutasi, cabang_sebelum, cabang_tujuan } = req.body;
  try {
    await Mutasi.create({
      keterangan_mutasi: keterangan_mutasi,
      cabang_sebelum: cabang_sebelum,
      cabang_tujuan: cabang_tujuan,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Mutasi Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateMutasi = async (req, res) => {
  try {
    const mutasi = await Mutasi.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!mutasi) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const { keterangan_mutasi, cabang_sebelum, cabang_tujuan } = req.body;
    if (req.role === "admin") {
      await Mutasi.update(
        { keterangan_mutasi, cabang_sebelum, cabang_tujuan },
        {
          where: {
            id: mutasi.id,
          },
        }
      );
    } else {
      if (req.userId !== mutasi.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await Mutasi.update(
        { keterangan_mutasi, cabang_sebelum, cabang_tujuan },
        {
          where: {
            [Op.and]: [{ id: mutasi.id }, { userId: req.userId }],
          },
        }
      );
    }
    // kirim response
    res.status(200).json({ msg: "Mutasi updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteMutasi = async (req, res) => {
  try {
    const mutasi = await Mutasi.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!mutasi) return res.status(404).json({ msg: "Data tidak ditemukan" });

    if (req.role === "admin") {
      await Mutasi.destroy({
        where: {
          id: mutasi.id,
        },
      });
    } else {
      if (req.userId !== mutasi.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await Mutasi.destroy({
        where: {
          [Op.and]: [{ id: mutasi.id }, { userId: req.userId }],
        },
      });
    }
    // kirim response
    res.status(200).json({ msg: "Mutasi deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
