import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }

  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });

  if (!user) return res.status(404).json({ msg: "Akun User tidak ditemukan" });
  res.userId = user.id;
  req.role = user.role;
  next();
};
