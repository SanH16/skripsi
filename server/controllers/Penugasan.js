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
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
