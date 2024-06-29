import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
// import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import RekrutmenRoute from "./routes/RekrutmenRoute.js";

dotenv.config();
const port = process.env.APP_PORT;

const app = express();

// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
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

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
