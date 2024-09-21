const express = require("express");
const Authrouter = require("./Routes/AuthRoutes");
const connectDb = require("./DbConnect/dbConnect");
const dotenv = require("dotenv");
const NoteRouter = require("./Routes/NoteRoutes");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());
app.use("/auth", Authrouter);
app.use("/note", NoteRouter);

connectDb().then(
  app.listen(PORT, () => {
    console.log("Server Running");
  })
);
