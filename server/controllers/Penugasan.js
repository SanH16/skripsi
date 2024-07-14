import { Op } from "sequelize";
import Pegawai from "../models/PegawaiModel.js";
import Penugasan from "../models/PenugasanModel.js";
import User from "../models/UserModel.js";

export const getAllPenugasan = async (req, res) => {
  try {
    const response = await Penugasan.findAll({
      attributes: [
        "uuid",
        "judul",
        "keterangan_tugas",
        "durasi_waktu",
        "penempatan",
        "status_tugas",
        "tasks_list",
        "completed_at",
      ],
      include: [
        {
          model: User,
          attributes: ["name", "email", "role"],
          include: [
            {
              model: Pegawai,
              attributes: ["jabatan", "photo"],
            },
          ],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPenugasanById = async (req, res) => {
  try {
    const penugasan = await Penugasan.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!penugasan) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const response = await Penugasan.findOne({
      attributes: [
        "uuid",
        "judul",
        "keterangan_tugas",
        "durasi_waktu",
        "penempatan",
        "status_tugas",
        "tasks_list",
        "completed_at",
      ],
      where: {
        id: penugasan.id,
      },
      include: [
        {
          model: User,
          attributes: ["name", "email", "role"],
          include: [
            {
              model: Pegawai,
              attributes: ["jabatan", "photo"],
            },
          ],
        },
      ],
    });
    // response
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPenugasan = async (req, res) => {
  const { judul, keterangan_tugas, durasi_waktu, penempatan, status_tugas, tasks_list, completed_at } = req.body;
  if (req.role !== "admin") {
    return res.status(403).send("Hanya admin yang dapat membuat penugasan");
  }
  try {
    await Penugasan.create({
      judul: judul,
      keterangan_tugas: keterangan_tugas,
      durasi_waktu: durasi_waktu,
      penempatan: penempatan,
      status_tugas: status_tugas,
      tasks_list: tasks_list,
      completed_at: completed_at,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Penugasan Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updatePenugasan = async (req, res) => {
  try {
    const penugasan = await Penugasan.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!penugasan) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const { judul, keterangan_tugas, durasi_waktu, penempatan, status_tugas, tasks_list, completed_at } = req.body;
    if (req.role === "admin") {
      await Penugasan.update(
        { judul, keterangan_tugas, durasi_waktu, penempatan, status_tugas, tasks_list, completed_at },
        {
          where: {
            id: penugasan.id,
          },
        }
      );
    } else {
      if (req.userId !== penugasan.userId) return res.status(403).json({ msg: "Akses Terlarang" });
      await Penugasan.update(
        { judul, keterangan_tugas, durasi_waktu, penempatan, status_tugas, tasks_list, completed_at },
        {
          where: {
            [Op.and]: [{ id: penugasan.id }, { userId: req.userId }],
          },
        }
      );
    }
    // response
    res.status(200).json({ msg: "Penugasan updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePenugasan = async (req, res) => {
  try {
    const penugasan = await Penugasan.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!penugasan) return res.status(404).json({ msg: "Data tidak ditemukan" });

    if (req.role === "admin") {
      await Penugasan.destroy({
        where: {
          id: penugasan.id,
        },
      });
    } else {
      if (req.userId !== penugasan.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await Penugasan.destroy({
        where: {
          [Op.and]: [{ id: penugasan.id }, { userId: req.userId }],
        },
      });
    }
    // kirim response
    res.status(200).json({ msg: "Penugasan deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
