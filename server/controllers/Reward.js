import Reward from "../models/RewardModel.js";
import User from "../models/UserModel.js";
import Pegawai from "../models/PegawaiModel.js";
// import { Op } from "sequelize";

export const getDataReward = async (req, res) => {
  try {
    let response;
    const rewardAttributes = ["uuid", "bonus_reward", "total_pendapatan", "nama_pegawai"];
    const userAttributes = ["name", "email", "role"];
    const pegawaiAttributes = ["gaji_pegawai"];

    if (req.role === "admin") {
      response = await Reward.findAll({
        attributes: rewardAttributes,
        include: [
          {
            model: User,
            attributes: userAttributes,
            include: [
              {
                model: Pegawai,
                attributes: pegawaiAttributes,
              },
            ],
          },
        ],
      });
    } else {
      response = await Reward.findAll({
        attributes: rewardAttributes,
        where: {
          nama_pegawai: req.userName,
        },
        include: [
          {
            model: User,
            attributes: userAttributes,
            include: [
              {
                model: Pegawai,
                attributes: pegawaiAttributes,
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
  const { nama_pegawai, bonus_reward } = req.body;
  try {
    const pegawai = await Pegawai.findOne({
      where: {
        userId: req.userId,
      },
      attributes: ["gaji_pegawai"],
    });

    // const user = await User.findAll({
    //   where: {
    //     id: req.params.id
    //   },
    //   attributes: ["name"],
    // });

    // if (!pegawai) {
    //   return res.status(404).json({ msg: "Pegawai tidak ditemukan" });
    // }

    // const matching = user.name === nama_pegawai;

    const gaji_pokok = pegawai.gaji_pegawai;
    const total_pendapatan = gaji_pokok + bonus_reward;

    await Reward.create({
      bonus_reward: bonus_reward,
      total_pendapatan: total_pendapatan,
      nama_pegawai: nama_pegawai,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Reward berhasil dibuat" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
