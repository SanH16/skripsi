import Reward from "../models/RewardModel.js";
import User from "../models/UserModel.js";

export const getDataReward = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response;
      await Reward.findAll({
        attributes: ["uuid", "bonus_reward", "total_gaji"],
        include: [
          {
            model: User,
            attributes: ["name", "email", "role"],
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
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
