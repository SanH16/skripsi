import Reward from "../models/RewardModel.js";
import User from "../models/UserModel.js";
import Pegawai from "../models/PegawaiModel.js";

export const getDataReward = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Reward.findAll({
        attributes: ["uuid", "bonus_reward", "total_gaji"],
        include: [
          {
            model: User,
            attributes: ["name", "email", "role"],
            include: [
              {
                model: Pegawai,
                attributes: ["gaji_pegawai"],
              },
            ],
          },
        ],
      });
    } else {
      response = await Reward.findAll({
        attributes: ["uuid", "bonus_reward", "total_gaji"],
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
                attributes: ["gaji_pegawai"],
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

export const createReward = async (req, res) => {
  const { bonus_reward } = req.body;
  try {
    const pegawai = await Pegawai.findOne({
      where: {
        userId: req.userId,
      },
      attributes: ["gaji_pegawai"],
    });

    if (!pegawai) {
      return res.status(404).json({ msg: "Pegawai tidak ditemukan" });
    }

    const gaji_pegawai = pegawai.gaji_pegawai;
    const total_gaji = gaji_pegawai + bonus_reward;

    await Reward.create({
      bonus_reward: bonus_reward,
      total_gaji: total_gaji,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Reward berhasil dibuat" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
