const express = require("express");
const { connect } = require("./config/db");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

const app = express();
app.use(express.json());
connect();
app.use(cors());
app.use("/user", require("./routes/userRoutes"));
app.use("/auth", require("./routes/authRoutes"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server running`));
