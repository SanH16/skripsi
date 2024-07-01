import Cuti from "../models/CutiModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getAllCuti = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Cuti.findAll({
        attributes: ["uuid", "alasan_cuti", "status", "start_cuti", "end_cuti", "keterangan", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["name", "email", "role"],
          },
        ],
      });
    } else {
      response = await Cuti.findAll({
        attributes: ["uuid", "alasan_cuti", "status", "start_cuti", "end_cuti", "keterangan", "createdAt"],
        where: {
          userId: req.userId, // melihat data yg diinput oleh user itu sendiri
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

export const getCutiById = async (req, res) => {
  try {
    const cuti = await Cuti.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!cuti) return res.status(404).json({ msg: "Data tidak ditemukan" });

    let response;
    if (req.role === "admin") {
      response = await Cuti.findOne({
        attributes: ["uuid", "alasan_cuti", "status", "start_cuti", "end_cuti", "keterangan", "createdAt"],
        where: {
          id: cuti.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email", "role"],
          },
        ],
      });
    } else {
      response = await Cuti.findOne({
        attributes: ["uuid", "alasan_cuti", "status", "start_cuti", "end_cuti", "keterangan", "createdAt"],
        where: {
          [Op.and]: [{ id: cuti.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    // kirim response
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createCuti = async (req, res) => {
  const { alasan_cuti, status, start_cuti, end_cuti, keterangan } = req.body;
  try {
    await Cuti.create({
      alasan_cuti: alasan_cuti,
      status: status,
      start_cuti: start_cuti,
      end_cuti: end_cuti,
      keterangan: keterangan,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Cuti Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateCuti = async (req, res) => {
  try {
    const cuti = await Cuti.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!cuti) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const { alasan_cuti, status, start_cuti, end_cuti, keterangan } = req.body;
    if (req.role === "admin") {
      await Cuti.update(
        { alasan_cuti, status, start_cuti, end_cuti, keterangan },
        {
          where: {
            id: cuti.id,
          },
        }
      );
    } else {
      if (req.userId !== cuti.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await Cuti.update(
        { alasan_cuti, status, start_cuti, end_cuti, keterangan },
        {
          where: {
            [Op.and]: [{ id: cuti.id }, { userId: req.userId }],
          },
        }
      );
    }
    // kirim response
    res.status(200).json({ msg: "Cuti updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteCuti = async (req, res) => {
  try {
    const cuti = await Cuti.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!cuti) return res.status(404).json({ msg: "Data tidak ditemukan" });

    if (req.role === "admin") {
      await Cuti.destroy({
        where: {
          id: cuti.id,
        },
      });
    } else {
      if (req.userId !== cuti.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await Cuti.destroy({
        where: {
          [Op.and]: [{ id: cuti.id }, { userId: req.userId }],
        },
      });
    }
    // kirim response
    res.status(200).json({ msg: "Cuti deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
