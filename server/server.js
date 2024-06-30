import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import RekrutmenRoute from "./routes/RekrutmenRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();
const port = process.env.APP_PORT;

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => { // Generate table di db
//   await db.sync();
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false, // Tidak menyimpan sesi jika tidak ada perubahan
    saveUninitialized: false, // Tidak menyimpan sesi yang baru kecuali sudah dimodifikasi
    store: store,
    cookie: {
      secure: false, // Set ke true jika menggunakan HTTPS
      sameSite: "strict",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

// route
app.use(UserRoute);
app.use(RekrutmenRoute);
app.use(AuthRoute);

// store.sync(); // membuat table session di db

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
