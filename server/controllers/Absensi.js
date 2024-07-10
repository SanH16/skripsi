import multer from "multer";
import path from "path";
import Absensi from "../models/AbsensiModel.js";
import User from "../models/UserModel.js";
import Pegawai from "../models/PegawaiModel.js";
import { Op } from "sequelize";

export const getDataAbsensi = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Absensi.findAll({
        attributes: ["uuid", "jam_masuk", "jam_keluar", "bukti_photo", "status", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["name", "email", "role"],
          },
        ],
      });
    } else {
      response = await Absensi.findAll({
        attributes: ["uuid", "jam_masuk", "jam_keluar", "bukti_photo", "status", "createdAt"],
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

export const getAbsensiById = async (req, res) => {
  try {
    const absensi = await Absensi.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!absensi) return res.status(404).json({ msg: "Data tidak ditemukan" });

    let response;
    if (req.role === "admin") {
      response = await Absensi.findOne({
        attributes: ["uuid", "jam_masuk", "jam_keluar", "bukti_photo", "status", "createdAt"],
        where: {
          id: absensi.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email", "role"],
            include: [
              {
                model: Pegawai,
                attributes: ["jabatan"],
              },
            ],
          },
        ],
      });
    } else {
      response = await Absensi.findOne({
        attributes: ["uuid", "jam_masuk", "jam_keluar", "bukti_photo", "status", "createdAt"],
        where: {
          [Op.and]: [{ id: absensi.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
            include: [
              {
                model: Pegawai,
                attributes: ["jabatan"],
              },
            ],
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

export const createAbsensi = async (req, res) => {
  const { jam_masuk, jam_keluar, status } = req.body;

  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const bukti_photo = req.file.filename;

  try {
    await Absensi.create({
      jam_masuk: jam_masuk,
      jam_keluar: jam_keluar,
      bukti_photo: bukti_photo,
      status: status,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Absensi Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateAbsensi = async (req, res) => {
  try {
    const absensi = await Absensi.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!absensi) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const { jam_masuk, jam_keluar, status } = req.body;

    let bukti_photo = absensi.bukti_photo; // Default to current image
    if (req.file) {
      bukti_photo = req.file.filename; // Isi new image if uploaded
    }

    if (req.role === "admin") {
      await Absensi.update(
        { jam_masuk, jam_keluar, bukti_photo, status },
        {
          where: {
            id: absensi.id,
          },
        }
      );
    } else {
      if (req.userId !== absensi.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await Absensi.update(
        { jam_masuk, jam_keluar, bukti_photo, status },
        {
          where: {
            [Op.and]: [{ id: absensi.id }, { userId: req.userId }],
          },
        }
      );
    }
    // kirim response
    res.status(200).json({ msg: "Absensi updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteAbsensi = async (req, res) => {
  try {
    const absensi = await Absensi.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!absensi) return res.status(404).json({ msg: "Data tidak ditemukan" });

    if (req.role === "admin") {
      await Absensi.destroy({
        where: {
          id: absensi.id,
        },
      });
    } else {
      if (req.userId !== absensi.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await Absensi.destroy({
        where: {
          [Op.and]: [{ id: absensi.id }, { userId: req.userId }],
        },
      });
    }
    // kirim response
    res.status(200).json({ msg: "Absensi deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-bukti-absen" + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" }, // 1 MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("bukti_photo");
