import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import RekrutmenRoute from "./routes/RekrutmenRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import CutiRoute from "./routes/CutiRoute.js";
import PegawaiRoute from "./routes/PegawaiRoute.js";
import MutasiRoute from "./routes/MutasiRoute.js";
import AbsensiRoute from "./routes/AbsensiRoute.js";
import LamaranRoute from "./routes/LamaranRoute.js";
import PenugasanRoute from "./routes/PenugasanRoute.js";
import RewardRoute from "./routes/RewardRoute.js";
import PhkRoute from "./routes/PhkRoute.js";
import PromosiRoute from "./routes/PromosiRoute.js";
import PunishmentRoute from "./routes/PunishmentRoute.js";

dotenv.config();
const port = process.env.APP_PORT;

const app = express();
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   // Generate table di db
//   // await db.sync();
//   await db.sync({ alter: true }); // sinkronisasi schema table to db
//   // await store.sync(); // Sinkronisasi tabel sessions
// })();

app.use(
  session({
    name: "token", // Nama cookie untuk menyimpan session ID
    secret: process.env.SESS_SECRET, // untuk assign cookie
    resave: false, // Tidak menyimpan sesi jika tidak ada perubahan
    saveUninitialized: false, // Tidak menyimpan sesi yang baru kecuali sudah dimodifikasi
    store: store, // Store untuk menyimpan sesi di database
    cookie: {
      secure: false, // Set ke true jika menggunakan HTTPS
      sameSite: "strict", // Mencegah pengiriman cookie ke situs lain
      maxAge: 1000 * 60 * 60 * 24, // expire cookie (1 hari)
      httpOnly: false,
    },
  })
);

app.use("/images", express.static("./images"));
app.use("/docfiles", express.static("./docfiles"));
app.use(
  cors({
    credentials: true, // allow pengiriman cookie di CORS
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

// route
app.use(UserRoute);
app.use(RekrutmenRoute);
app.use(AuthRoute);
app.use(CutiRoute);
app.use(PegawaiRoute);
app.use(MutasiRoute);
app.use(AbsensiRoute);
app.use(LamaranRoute);
app.use(PenugasanRoute);
app.use(RewardRoute);
app.use(PhkRoute);
app.use(PromosiRoute);
app.use(PunishmentRoute);

// store.sync(); // sinkronisasi table session di db
// store.sync({force: true}); // sinkronisasi table session di db dan menghapus data lama

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
