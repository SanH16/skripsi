import Rekrutmen from "../models/RekrutmenModel.js";
import User from "../models/UserModel.js";

export const getRekrutmens = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      // jika login as admin
      response = await Rekrutmen.findAll({
        attributes: ["uuid", "title", "tags", "reference", "image", "image_desc", "text_desc"],
        include: [
          {
            model: User,
            attributes: ["name", "email", "role"],
          },
        ],
      });
    } else {
      response = await Rekrutmen.findAll({
        attributes: ["uuid", "title", "tags", "reference", "image", "image_desc", "text_desc"],
        // jika login as user
        where: {
          userId: req.userId, // melihat data yg diinput oleh user itu sendiri
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

export const getRekrutmenById = (req, res) => {};

export const createRekrutmen = async (req, res) => {
  const { title, tags, reference, image, image_desc, text_desc } = req.body;
  try {
    await Rekrutmen.create({
      title: title,
      tags: tags,
      reference: reference,
      image: image,
      image_desc: image_desc,
      text_desc: text_desc,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Rekrutmen Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateRekrutmen = (req, res) => {};

export const deleteRekrutmen = (req, res) => {};
