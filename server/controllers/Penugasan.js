import { Op } from "sequelize";
import Pegawai from "../models/PegawaiModel.js";
import Penugasan from "../models/PenugasanModel.js";
import User from "../models/UserModel.js";

export const getAllPenugasan = async (req, res) => {
  try {
    let whereClause = {};
    // Ambil jabatan dari Pegawai yang terkait dengan user saat ini
    if (req.role !== "admin") {
      const pegawai = await Pegawai.findOne({
        where: {
          userId: req.userId,
        },
      });

      if (!pegawai) {
        return res.status(404).json({ msg: "Pegawai tidak ditemukan untuk user ini" });
      }

      const jabatan = pegawai.jabatan;
      whereClause.divisi = jabatan; // Hanya menampilkan penugasan berdasarkan jabatan pengguna
    }

    const response = await Penugasan.findAll({
      attributes: [
        "uuid",
        "judul",
        "keterangan_tugas",
        "durasi_waktu",
        "divisi",
        "penempatan",
        "status_tugas",
        "tasks_list",
        "completed_at",
      ],
      where: whereClause,
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
        "divisi",
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
  const { judul, keterangan_tugas, durasi_waktu, penempatan, divisi, status_tugas, tasks_list, completed_at } =
    req.body;
  try {
    await Penugasan.create({
      judul: judul,
      keterangan_tugas: keterangan_tugas,
      durasi_waktu: durasi_waktu,
      divisi: divisi,
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

    const { tasks_list, status_tugas } = req.body;
    await Penugasan.update(
      { tasks_list, status_tugas },
      {
        where: {
          id: penugasan.id,
        },
      }
    );

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
      return res.status(403).json({ msg: "Akses terlarang" });
    }
    // kirim response
    res.status(200).json({ msg: "Penugasan deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
