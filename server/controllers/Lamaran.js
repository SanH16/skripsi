import multer from "multer";
import path from "path";
import Lamaran from "../models/LamaranModel.js";
import Rekrutmens from "../models/RekrutmenModel.js";
// import { Op } from "sequelize";

export const getDataLamaran = async (req, res) => {
  try {
    const response = await Lamaran.findAll({
      attributes: ["uuid", "nama", "nomor_telepon", "pendidikan_terakhir", "keterampilan", "dokumen_cv"],
      include: [
        {
          model: Rekrutmens,
          attributes: ["title"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createLamaran = async (req, res) => {
  const { nama, nomor_telepon, pendidikan_terakhir, keterampilan } = req.body;

  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const dokumen_cv = req.file.filename;

  try {
    await Lamaran.create({
      nama: nama,
      nomor_telepon: nomor_telepon,
      pendidikan_terakhir: pendidikan_terakhir,
      keterampilan: keterampilan,
      dokumen_cv: dokumen_cv,
    });
    res.status(201).json({ msg: "Lamaran berhasil diupload" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteLamaran = async (req, res) => {
  const lamaran = await Lamaran.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!lamaran) return res.status(404).json({ msg: "Lamaran tidak ditemukan" });
  try {
    await Lamaran.destroy({
      where: {
        id: lamaran.id,
      },
    });
    res.status(200).json({ msg: "Data Lamaran berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "docfiles");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-lamaran-${file.originalname}`);
  },
});

// Filter file untuk menerima hanya PDF
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Hanya file PDF yang diperbolehkan!"), false);
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" }, // 2 MB
  fileFilter: fileFilter,
}).single("dokumen_cv");
