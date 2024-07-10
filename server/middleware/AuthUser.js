import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  try {
    console.log("Session data in verifyUser:", req.session);

    // periksa uuid di sesi
    if (!req.session.userId) {
      return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }

    // cari pengguna berdasarkan userId dari sesi
    const user = await User.findOne({
      where: {
        uuid: req.session.userId,
      },
    });

    // jika pengguna tidak ditemukan
    if (!user) return res.status(404).json({ msg: "Akun User tidak ditemukan" });

    // tambahkan userId dan role ke object request
    req.userId = user.id;
    req.role = user.role;
    req.userName = user.name;

    // lanjutkan ke middleware atau handler lainnya
    next();
  } catch (error) {
    console.error("Error in verifyUser middleware:", error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const adminOnly = async (req, res, next) => {
  try {
    // cari pengguna berdasarkan userId dari sesi
    const user = await User.findOne({
      where: {
        uuid: req.session.userId,
      },
    });

    // jika pengguna tidak ditemukan
    if (!user) return res.status(404).json({ msg: "Akun User tidak ditemukan" });

    // jika pengguna bukan admin
    if (user.role !== "admin") return res.status(403).json({ msg: "Akses terlarang" });

    next();
  } catch (error) {
    console.error("Error in adminOnly middleware:", error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};
