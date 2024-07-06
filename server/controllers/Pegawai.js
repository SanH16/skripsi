import Cuti from "../models/CutiModel.js";
import Pegawai from "../models/PegawaiModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getDataPegawai = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Pegawai.findAll({
        attributes: [
          "uuid",
          "nik",
          "jabatan",
          "gaji_pegawai",
          "phone",
          "tanggal_lahir",
          "gender",
          "address",
          "pendidikan",
          "status_menikah",
          "status_bekerja",
        ],
        include: [
          {
            model: User,
            attributes: ["name", "email", "role"],
            include: [
              {
                model: Cuti,
                attributes: ["status"],
              },
            ],
          },
        ],
      });
    } else {
      response = await Pegawai.findAll({
        attributes: [
          "uuid",
          "nik",
          "jabatan",
          "gaji_pegawai",
          "phone",
          "tanggal_lahir",
          "gender",
          "address",
          "pendidikan",
          "status_menikah",
          "status_bekerja",
        ],
        where: {
          userId: req.userId, // melihat data yg diinput oleh user itu sendiri
        },
        include: [
          {
            model: User,
            attributes: ["name", "email", "role"],
            include: [
              {
                model: Cuti,
                attributes: ["status"],
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

export const getPegawaiById = async (req, res) => {
  try {
    const pegawai = await Pegawai.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!pegawai) return res.status(404).json({ msg: "Data tidak ditemukan" });

    let response;
    if (req.role === "admin") {
      response = await Pegawai.findOne({
        attributes: [
          "uuid",
          "nik",
          "jabatan",
          "gaji_pegawai",
          "phone",
          "tanggal_lahir",
          "gender",
          "address",
          "pendidikan",
          "status_menikah",
          "status_bekerja",
        ],
        where: {
          id: pegawai.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email", "role"],
          },
        ],
      });
    } else {
      response = await Pegawai.findOne({
        attributes: [
          "uuid",
          "nik",
          "jabatan",
          "gaji_pegawai",
          "phone",
          "tanggal_lahir",
          "gender",
          "address",
          "pendidikan",
          "status_menikah",
          "status_bekerja",
        ],
        where: {
          [Op.and]: [{ id: pegawai.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
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

export const createPegawai = async (req, res) => {
  const {
    nik,
    jabatan,
    gaji_pegawai,
    phone,
    tanggal_lahir,
    gender,
    address,
    pendidikan,
    status_menikah,
    status_bekerja,
  } = req.body;
  try {
    const existingPegawai = await Pegawai.findOne({ where: { userId: req.userId } });
    if (existingPegawai || !req.role === "admin") {
      return res.status(400).json({ msg: "User sudah memiliki pegawai terdaftar" });
    }

    await Pegawai.create({
      nik: nik,
      jabatan: jabatan,
      gaji_pegawai: gaji_pegawai,
      phone: phone,
      tanggal_lahir: tanggal_lahir,
      gender: gender,
      address: address,
      pendidikan: pendidikan,
      status_menikah: status_menikah,
      status_bekerja: status_bekerja,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Pegawai Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updatePegawai = async (req, res) => {
  try {
    const pegawai = await Pegawai.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!pegawai) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const {
      nik,
      jabatan,
      gaji_pegawai,
      phone,
      tanggal_lahir,
      gender,
      address,
      pendidikan,
      status_menikah,
      status_bekerja,
    } = req.body;
    if (req.role === "admin") {
      await Pegawai.update(
        {
          nik,
          jabatan,
          gaji_pegawai,
          phone,
          tanggal_lahir,
          gender,
          address,
          pendidikan,
          status_menikah,
          status_bekerja,
        },
        {
          where: {
            id: pegawai.id,
          },
        }
      );
    } else {
      if (req.userId !== pegawai.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await Pegawai.update(
        {
          nik,
          jabatan,
          gaji_pegawai,
          phone,
          tanggal_lahir,
          gender,
          address,
          pendidikan,
          status_menikah,
          status_bekerja,
        },
        {
          where: {
            [Op.and]: [{ id: pegawai.id }, { userId: req.userId }],
          },
        }
      );
    }
    // kirim response
    res.status(200).json({ msg: "Pegawai updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePegawai = async (req, res) => {
  try {
    const pegawai = await Pegawai.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!pegawai) return res.status(404).json({ msg: "Data tidak ditemukan" });

    if (req.role === "admin") {
      await Pegawai.destroy({
        where: {
          id: pegawai.id,
        },
      });
    } else {
      if (req.userId !== pegawai.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await Pegawai.destroy({
        where: {
          [Op.and]: [{ id: pegawai.id }, { userId: req.userId }],
        },
      });
    }
    // kirim response
    res.status(200).json({ msg: "Pegawai deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
