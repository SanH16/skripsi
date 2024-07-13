import Pegawai from "../models/PegawaiModel.js";
import Penugasan from "../models/PenugasanModel.js";
import User from "../models/UserModel.js";

export const getAllPenugasan = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Penugasan.findAll({
        attributes: [
          "uuid",
          "judul",
          "keterangan_tugas",
          "target_selesai",
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
    } else {
      response = await Penugasan.findAll({
        attributes: [
          "uuid",
          "judul",
          "keterangan_tugas",
          "target_selesai",
          "status_tugas",
          "tasks_list",
          "completed_at",
        ],
        where: {
          userId: req.userId,
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
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPenugasan = async (req, res) => {
  const { judul, keterangan_tugas, target_selesai, status_tugas, tasks_list, completed_at } = req.body;
  try {
    await Penugasan.create({
      judul: judul,
      keterangan_tugas: keterangan_tugas,
      target_selesai: target_selesai,
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
